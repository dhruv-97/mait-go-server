var express = require('express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var faculties = require('../models/faculty');
var Verify=require('./verify');

var facultyRouter = express.Router();

facultyRouter.use(bodyParser.json());

facultyRouter.route('/')
.get(function (req, res, next) {
    faculties.findById("5909cbfef36d2842bdf885b7",function (err, faculty) {
        if (err) next(err);
        res.json(faculty);
        });
});
module.exports=facultyRouter;