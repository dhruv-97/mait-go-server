var express = require('express');
var shortid = require('shortid'); 
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var assignments = require('../models/assignment');
var Verify=require('./verify');
const aws = require('aws-sdk');
aws.config.update({region: 'ap-south-1'});
const S3_BUCKET = process.env.S3_BUCKET_NAME||"mait-server-img";
var assignmentRouter = express.Router();

assignmentRouter.use(bodyParser.json());

assignmentRouter.route('/')
.get(function (req, res, next) {
    assignments.find({}).sort('-createdAt').exec( function (err, assignment) {
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
    assignments.find({"sem":sem,"group":group}).sort('-createdAt').exec(function (err, assignment) {
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
        res.json(resp);
    });
});
module.exports=assignmentRouter;