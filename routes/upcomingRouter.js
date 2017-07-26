var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var shortid = require('shortid');
var upcomings = require('../models/upcoming');
const aws = require('aws-sdk');
var verify = require('./verify');
aws.config.update({region: 'ap-south-1'});
const S3_BUCKET = process.env.S3_BUCKET_NAME;
var upcomingRouter = express.Router();

upcomingRouter.use(bodyParser.json());

upcomingRouter.route('/')
.get(verify.verifyAppUser,function (req, res, next) {
    upcomings.find({}).sort('eventDate').exec(function(err, upcomings) { 
        if (err) throw err;
        res.json(upcomings); 
    });
})

.post(function (req, res, next) {
    upcomings.create(req.body, function (err, upcoming) {
        if (err) next(err);
        console.log('upcoming created!');
        var id = upcoming._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the upcoming with id: ' + id);
    });
})

.delete(function (req, res, next) {
    upcomings.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});
upcomingRouter.route('/sign-s3')
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

upcomingRouter.route('/:upcomingId')
.get(verify.verifyAppUser,function (req, res, next) {
    upcomings.findById(req.params.upcomingId,function (err, upcoming) {
        if (err) next(err);
        res.json(upcoming);
        });
})

.put(function (req, res, next) {
    upcomings.findByIdAndUpdate(req.params.upcomingId, {
        $set: req.body
    }, {
        new: true
    }, function (err, upcoming) {
        if (err) next(err);
        res.json(upcoming);
    });
})

.delete(function (req, res, next) {
        upcomings.findByIdAndRemove(req.params.upcomingId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});
module.exports=upcomingRouter;