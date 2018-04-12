var express = require('express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Updates = require('../models/update');
var TimeTables = require('../models/timetable');
var Verify=require('./verify');
//var sample = require('./timetable.json');

var timetableRouter = express.Router();

timetableRouter.use(bodyParser.json());

timetableRouter.route('/')
.get(Verify.verifyAppUser,function (req, res, next) {
    TimeTables.find({}, function (err, timetables) {
        if (err) throw err;
        res.json(timetables);
    });
})

.post(Verify.verifyAppUser,function (req, res, next) {
    if(req.body.shift=='evening'){
        req.body.friday.forEach(function(period){
            period.p1[0].time='11:45 - 12:45';
            period.p2[0].time='12:45 - 1:45';
            period.p3[0].time='1:45 - 2:45';
            period.p4[0].time='2:45 - 3:45';
            period.p5[0].time='4:00 - 5:00';
            period.p6[0].time='5:00 - 6:00';
            period.p7[0].time='6:00 - 7:00';
        },this);
        req.body.thursday.forEach(function(period){
            period.p1[0].time='11:45 - 12:45';
            period.p2[0].time='12:45 - 1:45';
            period.p3[0].time='1:45 - 2:45';
            period.p4[0].time='2:45 - 3:45';
            period.p5[0].time='4:00 - 5:00';
            period.p6[0].time='5:00 - 6:00';
            period.p7[0].time='6:00 - 7:00';
        },this);
        req.body.wednesday.forEach(function(period){
            period.p1[0].time='11:45 - 12:45';
            period.p2[0].time='12:45 - 1:45';
            period.p3[0].time='1:45 - 2:45';
            period.p4[0].time='2:45 - 3:45';
            period.p5[0].time='4:00 - 5:00';
            period.p6[0].time='5:00 - 6:00';
            period.p7[0].time='6:00 - 7:00';
        },this);
        req.body.tuesday.forEach(function(period){
            period.p1[0].time='11:45 - 12:45';
            period.p2[0].time='12:45 - 1:45';
            period.p3[0].time='1:45 - 2:45';
            period.p4[0].time='2:45 - 3:45';
            period.p5[0].time='4:00 - 5:00';
            period.p6[0].time='5:00 - 6:00';
            period.p7[0].time='6:00 - 7:00';
        },this);
        req.body.monday.forEach(function(period){
            period.p1[0].time='11:45 - 12:45';
            period.p2[0].time='12:45 - 1:45';
            period.p3[0].time='1:45 - 2:45';
            period.p4[0].time='2:45 - 3:45';
            period.p5[0].time='4:00 - 5:00';
            period.p6[0].time='5:00 - 6:00';
            period.p7[0].time='6:00 - 7:00';
        },this);
    }
    else{
        req.body.friday.forEach(function(period){
            period.p1[0].time='8:15 - 9:15';
            period.p2[0].time='9:15 - 10:15';
            period.p3[0].time='10:15 - 11:15';
            period.p4[0].time='11:45 - 12:45';
            period.p5[0].time='12:45 - 1:45';
            period.p6[0].time='1:45 - 2:45';
            period.p7[0].time='2:45 - 3:45';
        },this);
        req.body.thursday.forEach(function(period){
            period.p1[0].time='8:15 - 9:15';
            period.p2[0].time='9:15 - 10:15';
            period.p3[0].time='10:15 - 11:15';
            period.p4[0].time='11:45 - 12:45';
            period.p5[0].time='12:45 - 1:45';
            period.p6[0].time='1:45 - 2:45';
            period.p7[0].time='2:45 - 3:45';
        },this);
        req.body.wednesday.forEach(function(period){
            period.p1[0].time='8:15 - 9:15';
            period.p2[0].time='9:15 - 10:15';
            period.p3[0].time='10:15 - 11:15';
            period.p4[0].time='11:45 - 12:45';
            period.p5[0].time='12:45 - 1:45';
            period.p6[0].time='1:45 - 2:45';
            period.p7[0].time='2:45 - 3:45';
        },this);
        req.body.tuesday.forEach(function(period){
            period.p1[0].time='8:15 - 9:15';
            period.p2[0].time='9:15 - 10:15';
            period.p3[0].time='10:15 - 11:15';
            period.p4[0].time='11:45 - 12:45';
            period.p5[0].time='12:45 - 1:45';
            period.p6[0].time='1:45 - 2:45';
            period.p7[0].time='2:45 - 3:45';
        },this);
        req.body.monday.forEach(function(period){
            period.p1[0].time='8:15 - 9:15';
            period.p2[0].time='9:15 - 10:15';
            period.p3[0].time='10:15 - 11:15';
            period.p4[0].time='11:45 - 12:45';
            period.p5[0].time='12:45 - 1:45';
            period.p6[0].time='1:45 - 2:45';
            period.p7[0].time='2:45 - 3:45';
        },this);

    }
    TimeTables.create(req.body, function (err, timetable) {
        if (err) throw(err);
        console.log('Timetable created!');
        var id = timetable._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the timetable with id: ' + id);
    });
})

.delete(Verify.verifyAppUser,function (req, res, next) {
    TimeTables.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

timetableRouter.route('/:timetableId')
.get(Verify.verifyAppUser,function (req, res, next) {
    var sem= req.params.timetableId[0];
    var group= req.params.timetableId.substring(1,req.params.timetableId.length);
    TimeTables.findOne({sem,group},function (err, timetable) {
        if (err) next(err);
        Updates.findOne({},function(err,update){
            if(timetable==null){
                timetable = {};
                timetable.notification = "Your timetable will be updated soon";
            }
            timetable.version = update.version;
            timetable.updatetype = update.updatetype;
            res.json(timetable);
          })
        })  
})

.put(Verify.verifyAppUser,function (req, res, next) {
    var sem= req.params.timetableId[0];
    var group= req.params.timetableId.substring(1,req.params.timetableId.length);
    delete req.body._id;
    TimeTables.findOneAndUpdate({sem,group}, {
        $set: req.body
    }, {
        new: true
    }, function (err, timetable) {
        if (err) throw(err);
        res.send('success');
    });
})

.delete(Verify.verifyAppUser,function (req, res, next) {
        TimeTables.findByIdAndRemove(req.params.timetableId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});
module.exports=timetableRouter;