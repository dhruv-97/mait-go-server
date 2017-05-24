var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var informations = require('../models/info');

var resultRouter = express.Router();

resultRouter.use(bodyParser.json());

resultRouter.route('/')
.get(function (req, res, next) {
    informations.find(req.query)
    .populate('result')
    .exec(function (err, resp) {
      if(err) next(err);
      res.json(resp);
    }); 
});
resultRouter.route('/:roll')
.get(function (req, res, next) {
  informations.findById(req.params.roll)
    .populate('result')
    .exec(function (err, resp) {
      if(err) next(err);
      res.json(resp.result);
    });
});
module.exports=resultRouter;