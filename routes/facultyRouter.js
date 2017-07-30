var express = require('express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var faculties = require('../models/faculty');
var Verify=require('./verify');

var facultyRouter = express.Router();

facultyRouter.use(bodyParser.json());

facultyRouter.route('/')
.get(Verify.verifyAppUser,function (req, res, next) {
    faculties.findById("59791301c9953e5f7b62177f",function (err, faculty) {
        if (err) next(err);
        res.json(faculty);
        });
})
.put(Verify.verifyAppUser,function (req, res, next) {
    faculties.findByIdAndUpdate("59791301c9953e5f7b62177f", {
        $set: req.body
    }, {
        new: true
    }, function (err, faculty) {
        if (err) next(err);
        res.json(faculty);
    });
})
.post(Verify.verifyAppUser,function (req, res, next) {
    faculties.create(req.body, function (err, faculty) {
        if (err) {
            console.log('Error Inserting New Data');
            if (err.name == 'ValidationError') {
                for (field in err.errors) {
                    console.log(err.errors[field].message); 
                }
            }
        }
        console.log('faculty created!');
        var id = faculty._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the faculty with id: ' + id);
    });
});
module.exports=facultyRouter;