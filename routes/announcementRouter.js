var express = require('express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Announcements = require('../models/announcements');
var Users = require('./models/user');

var Verify=require('./verify');

var announcementRouter = express.Router();

announcementRouter.use(bodyParser.json());

announcementRouter.route('/')
.get(function (req, res, next) {
    
    Announcements.find({}).sort('-createdAt').exec(function(err, announcements) { 
        if (err) throw err;
        res.json(announcements); 
    });
})

.post(function (req, res, next) {
    Announcements.create(req.body, function (err, announcement) {
        if (err) next(err);
        console.log('Announcement created!');
        var id = announcement._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        var group = announcement.sem + announcement.group;
        res.end('Added the announcement with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Announcements.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

announcementRouter.route('/:announcementId')
.get(function (req, res, next) {
    var sem= req.params.announcementId[0];
    var group= req.params.announcementId.substring(1,3);
    console.log(sem);
    console.log(group);
    Announcements.find({"sem":sem,"group":group}).sort('-createdAt').exec(function (err, announcement) {
        if (err) next(err);
        res.json(announcement);
        });
})

.put(function (req, res, next) {
    Announcements.findByIdAndUpdate(req.params.announcementId, {
        $set: req.body
    }, {
        new: true
    }, function (err, announcement) {
        if (err) next(err);
        res.json(announcement);
    });
})

.delete(function (req, res, next) {
        Announcements.findByIdAndRemove(req.params.announcementId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});
module.exports=announcementRouter;