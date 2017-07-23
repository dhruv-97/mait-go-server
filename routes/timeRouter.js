var express = require('express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var TimeTables = require('../models/timetable');
var Verify=require('./verify');

var timetableRouter = express.Router();

timetableRouter.use(bodyParser.json());

timetableRouter.route('/')
.get(function (req, res, next) {
    TimeTables.find({}, function (err, timetables) {
        if (err) throw err;
        res.json(timetables);
    });
})

.post(function (req, res, next) {
    TimeTables.create(req.body, function (err, timetable) {
        if (err) next(err);
        console.log('Timetable created!');
        var id = timetable._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the timetable with id: ' + id);
    });
})

.delete(function (req, res, next) {
    TimeTables.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

timetableRouter.route('/:timetableId')
.get(function (req, res, next) {
    var sem= req.params.timetableId[0];
    var group= req.params.timetableId.substring(1,req.params.timetableId.length);
    TimeTables.findOne({"sem":sem,"group":group},function (err, timetable) {
        if (err) next(err);
        if(timetable=={})
            res.json({notification:'notfound'});
        else
            res.json(timetable);
        });
})

.put(function (req, res, next) {
    TimeTables.findByIdAndUpdate(req.params.timetableId, {
        $set: req.body
    }, {
        new: true
    }, function (err, timetable) {
        if (err) next(err);
        res.json(timetable);
    });
})

.delete(function (req, res, next) {
        TimeTables.findByIdAndRemove(req.params.timetableId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});
module.exports=timetableRouter;