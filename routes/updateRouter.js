var express = require('express');
var bodyParser = require('body-parser');
var Updates = require('../models/update');
var updateRouter = express.Router();
var Verify = require('./verify');
updateRouter.use(bodyParser.json());
updateRouter.route('/')
.get(Verify.verifyAppUser,function (req, res, next) {
    Updates.findOne({},function(err,update){
      if(err) next(err);
      res.json(update);
    })
})
.put(Verify.verifyAppUser,function (req, res, next) {
  Updates.findOneAndUpdate({},req.body,function(err,update){
    if(err) next(err);
    res.json(update);
  })
});
module.exports = updateRouter;