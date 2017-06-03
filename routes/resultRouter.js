var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var results = require('../models/result');

var resultRouter = express.Router();

resultRouter.use(bodyParser.json());

resultRouter.route('/')
.get(function (req, res, next) {
    results.find(req.query).sort('-creditp').exec( function(err,resp){
      if(err) throw(err);
      res.json(resp);
    })
})
.post(function (req, res, next) {
    results.create(req.body, function (err, result) {
        if (err) next(err);
        console.log('result created!');
        var id = result._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the result with id:' , id);
    });
})
.delete(function (req, res, next) {
    results.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});
resultRouter.route('/:roll')
.get(function (req, res, next) {
  req.query.roll=req.params.roll;
  results.findOne(req.query)
    .populate('marks')
    .exec(function (err, resp) {
      if(err) next(err);
      res.json(resp);
    });
});
module.exports=resultRouter;