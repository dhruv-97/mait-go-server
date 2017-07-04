var express = require('express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Announcements = require('../models/announcements');
var Users = require('../models/user');
var request = require('request');
var options = {
  url: 'https://fcm.googleapis.com/fcm/send',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'key=AAAAiS4AtkA:APA91bGunMyKw0ite-QmK_Vnma39aHLp5uMw04o0gODo4SYjq3ujWiWcMPhEOHyDLV_oF6xdMRPU9QIbOeMbgIMy_AfiIUZJR5DiLRabbCzQBF894jtGXe7L0JvyMNfEezzNWt-ay8I7'
  },
  body: {        
 	"to":"c5Imac8r67A:APA91bH5ZUGZTkYz-3fj5pAWQ9zgho8tbaskfxy82xKTX47Xt-qc9sXpPUsAu8f0HygILI99xiz6RyVR8T2WhlFnvbdUt6FE08_iCMeMdXKf7XGOSof7UuAEm03iNp3LT2n9PIzSGjkI",
    
	"data": {
    "title":"fetchFornotification",
    "body":"data",
    "sound": "default"
    },
    "notification": {
    "title":"fetchForNotification",
    "body":"New announcement!",
    "sound": "default"
    }
 }

};
function sendNotifications(group) {
    
}

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
        Users.find({class:group},function(err,response){
            console.log(response);
            response.forEach(function(element) {
                let token = element.token;
                options.body.to=token;
                options.body=JSON.stringify(body);
                console.log(options);
                request(options, function(err,response2,body){
                    console.log(body);
                    res.end('Added the announcement with id: ' + id);
                })
            }, this);
        }); 
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