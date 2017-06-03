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
})
.post(function (req, res, next) {
    faculties.create(req.body, function (err, faculty) {
        if (err) next(err);
        console.log('faculty created!');
        var id = faculty._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the faculty with id: ' + id);
    });
});
module.exports=facultyRouter;