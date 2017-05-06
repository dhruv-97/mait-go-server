var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var assignments = require('../models/assignment');
var Verify=require('./verify');
var path = require('path'),
  multiparty = require('connect-multiparty'),
  multipartyMiddleware = multiparty();
var assignmentRouter = express.Router();

assignmentRouter.use(bodyParser.json());

assignmentRouter.route('/')
.get(function (req, res, next) {
    assignments.find({}, function (err, assignment) {
        if (err) throw err;
        res.json(assignment);
    });
})
.post(multipartyMiddleware, function (req, res, next) {
    var file = req.files.file;
    //console.log(file.name);
    //console.log(file.type);
    //console.log(file.path);
    req.body.format = file.type.substring(6,file.type.length);
    assignments.nextCount(function(err, count){
        req.body.file="public/img/assignment/"+count+'.'+req.body.format;
        fs.rename(file.path,req.body.file, function(err) {
            if (err)
              return res.status(500).send(err);
            req.body.file=req.body.file.substring(7);
            assignments.create(req.body, function (err, assignment) {
                console.log(req.body);
                if (err) next(err);
                console.log('assignment created!');
                var id = assignment._id;
                res.setHeader("Access-Control-Allow-Origin", 'http://localhost');
                res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });

                res.end('Added the assignment with id: ' + id);
            });
        });
    });
})
.delete(function (req, res, next) {
    assignments.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});
assignmentRouter.route('/:assignmentId')
.get(function (req, res, next) {
    var sem= req.params.assignmentId[0];
    var group= req.params.assignmentId.substring(1,req.params.assignmentId.length);
    assignments.find({"sem":sem,"group":group},function (err, assignment) {
        if (err) next(err);
        res.json(assignment);
        });
})


.put(function (req, res, next) {
    assignments.findByIdAndUpdate(req.params.assignmentId, {
        $set: req.body
    }, {
        new: true
    }, function (err, assignment) {
        if (err) next(err);
        res.json(assignment);
    });
})

.delete(function (req, res, next) {
        assignments.findByIdAndRemove(req.params.assignmentId, function (err, resp) {
        if (err) next(err);
        fs.exists('public/img/assignment/'+req.params.assignmentId+'.jpg', function(exists) {
        if(exists) {
            //Show in green
            console.log('File exists. Deleting now ...');
            fs.unlink('public/img/assignment/'+req.params.assignmentId+'.jpg');
        } else {
            //Show in red
            console.log('File not found, so not deleting.');
        }
        });
        res.json(resp);
    });
});
module.exports=assignmentRouter;