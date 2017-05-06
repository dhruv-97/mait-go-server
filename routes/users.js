var express = require('express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var MaitUsers = require('../models/user');
//var Verify=require('./verify');

var MaitUserRouter = express.Router();

MaitUserRouter.use(bodyParser.json());

MaitUserRouter.route('/')
.get(function (req, res, next) {
    MaitUsers.find({}, function (err, MaitUsers) {
        if (err) throw err;
        res.json(MaitUsers);
    });
})

.post(function (req, res, next) {
  MaitUsers.find({"roll":req.body.roll}, function (err, user) {
        if (err) throw err;
        if(user==null){
          console.log('Inside IF');
          MaitUsers.create(req.body, function (err, MaitUser) {
              if (err) next(err);
              console.log('MaitUser created!');
              var id = MaitUser._id;
              res.setHeader("Access-Control-Allow-Origin", 'https://localhost:3443');
              res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
              res.writeHead(200, {
                  'Content-Type': 'text/plain'
              });

              res.end('Added the MaitUser with id: ' + id);
          });
        }
        else
          res.json(user);
    });
})

.delete(function (req, res, next) {
    MaitUsers.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

MaitUserRouter.route('/:MaitUserId')
.get(function (req, res, next) {
    MaitUsers.findById(req.params.MaitUserId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
})

.put(function (req, res, next) {
    MaitUsers.findByIdAndUpdate(req.params.MaitUserId, {
        $set: req.body
    }, {
        new: true
    }, function (err, MaitUser) {
        if (err) next(err);
        res.json(MaitUser);
    });
})

.delete(function (req, res, next) {
        MaitUsers.findByIdAndRemove(req.params.MaitUserId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});
module.exports=MaitUserRouter;