var express = require('express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Users = require('../models/user');
//var Verify=require('./verify');

var UserRouter = express.Router();

UserRouter.use(bodyParser.json());

UserRouter.route('/')
.get(function (req, res, next) {
    Users.find({}, function (err, Users) {
        if (err) throw err;
        res.json(Users);
    });
})

.post(function (req, res, next) {
  Users.findById(req.body._id, function (err, user) {
        if (err) throw err;
        if(user==null){
          Users.create(req.body, function (err, User) {
              if (err) next(err);
              console.log('User created!');
              var id = User._id;
              res.writeHead(200, {
                  'Content-Type': 'text/plain'
              });

              res.end('Added the User with id: ' + id);
          });
        }
        else{
            Users.findByIdAndUpdate(req.body._id, {
                $set: req.body
            }, {
                new: true
            }, function (err, User) {
                if (err) next(err);
                res.json(User);
            });
                }
    });
})
.delete(function (req, res, next) {
    Users.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

UserRouter.route('/:UserId')
.get(function (req, res, next) {
    Users.findById(req.params.UserId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
})

.put(function (req, res, next) {
    Users.findByIdAndUpdate(req.params.UserId, {
        $set: req.body
    }, {
        new: true
    }, function (err, User) {
        if (err) next(err);
        res.json(User);
    });
})

.delete(function (req, res, next) {
        Users.findByIdAndRemove(req.params.UserId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});
module.exports=UserRouter;