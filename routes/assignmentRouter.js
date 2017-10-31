var express = require('express');
var shortid = require('shortid'); 
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var assignments = require('../models/assignment');
var Users = require('../models/user');
var unirest = require('unirest');
var Verify=require('./verify');
const aws = require('aws-sdk');

function createDate(){
  let date = new Date();
    return date.getDate() + "/"
                + (date.getMonth()+1)  + "/" 
                + date.getFullYear();
}
function createTime(){
    let date = new Date();
    let hours = date.getHours();
    let hoursString;
    if(hours<10)
        hoursString='0'+String(hours);
    else
        hoursString=String(hours);
    let mins = date.getMinutes();
    let minsString;
    if(mins<10)
        minsString='0'+String(mins);
    else
        minsString=String(mins);
    return hoursString+':'+minsString;
}

aws.config.update({region: 'ap-south-1'});
const S3_BUCKET = process.env.S3_BUCKET_NAME||"mait-server-img";
var assignmentRouter = express.Router();

assignmentRouter.use(bodyParser.json());

assignmentRouter.route('/')
.get(Verify.verifyAppUser,function (req, res, next) {
    assignments.find(req.query).sort('-createdAt').exec( function (err, assignment) {
        if (err) throw err;
        res.json(assignment);
    });
})
.post(Verify.verifyOrdinaryUser,function (req, res, next) {
    req.body.date = createDate();
    req.body.time = createTime();
    assignments.create(req.body, function (err, assignment) {
        if (err) throw(err);
        console.log('assignment created!');
        var id = assignment._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the assignment with id: ' + id);
        var group = assignment.sem + assignment.group;
        Users.find({class:group},function(err,response){
            response.forEach(function(element) {
                let token = element.token;
                unirest.post('https://fcm.googleapis.com/fcm/send')
                .headers({'Content-Type': 'application/json',
                        'Authorization': 'key=AAAAiS4AtkA:APA91bHv6islehAx0nRsakGfz8rEahTFa7DFzPVHipDAV_8__v5utSn4e3PVi2CCNph27-BEmK3Tk_uh47Etj9JF6ppXd2OKKNNIvdQgEhXBH16bk6b42-IHjn_sVlBR06lDU4k9MCe9'})
                .send({ "to":token,
                        "data": {
                        "title":"New Assignment!",
                        "body": assignment.name+ " has uploaded a new assignment."
                        } })
                .end(function (response) {
                });
            }, this);
        });
    });
})
.delete(Verify.verifyAppUser,function (req, res, next) {
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
.get(Verify.verifyAppUser,function (req, res, next) {
    var sem= req.params.assignmentId[0];
    var group= req.params.assignmentId.substring(1,req.params.assignmentId.length);
    assignments.find({"sem":sem,"group":group}).sort('-createdAt').exec(function (err, assignment) {
        if (err) next(err);
        res.json(assignment);
        });
})


.put(Verify.verifyAppUser,function (req, res, next) {
    assignments.findByIdAndUpdate(req.params.assignmentId, {
        $set: req.body
    }, {
        new: true
    }, function (err, assignment) {
        if (err) next(err);
        res.json(assignment);
    });
})

.delete(Verify.verifyAppUser,function (req, res, next) {
        assignments.findByIdAndRemove(req.params.assignmentId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});
module.exports=assignmentRouter;