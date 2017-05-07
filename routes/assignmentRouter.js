var express = require('express');
var fs = require('fs');
var shortid = require('shortid'); 
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var assignments = require('../models/assignment');
var Verify=require('./verify');
const aws = require('aws-sdk');
aws.config.update({region: 'ap-south-1'});
const S3_BUCKET = "mait-server-img";
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
.post(function (req, res, next) {
    console.log(req.body);
    assignments.create(req.body, function (err, assignment) {
        if (err) next(err);
        console.log('assignment created!');
        var id = assignment._id;
        res.setHeader("Access-Control-Allow-Origin", 'https://localhost:3443');
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the assignment with id: ' + id);
    });
})
.delete(function (req, res, next) {
    assignments.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});
assignmentRouter.route('/sign-s3')
.get(function (req, res, next) {
    const s3 = new aws.S3({signatureVersion: 'v4'});
  const fileName = shortid.generate();
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
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