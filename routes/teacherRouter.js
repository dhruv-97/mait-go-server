var express = require('express');

var passport = require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../models/teacher');
var Verify    = require('./verify');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. 
router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  if(err) {
  	return res.status(403).json({message: 'You are not authorized to perform this operation'});
  }
  else{
  	Users.find({}, function (err, users) {
        if (err) throw err;
        res.json(users);
    });
  }

}); */
router.get('/',Verify.verifyOrdinaryUser, function(req, res, next) {
  User.find({}, function (err, users) {
        if (err) throw err;
        res.json(users);
    });
});


router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }),
        req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
                if(req.body.firstname) {
            user.firstname = req.body.firstname;
        }
        if(req.body.lastname) {
            user.lastname = req.body.lastname;
        }
                user.save(function(err,user) {
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({status: 'Registration Successful!'});
            });
        });
    });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      throw(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
        
      var token = Verify.getToken(user);
              res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

router.get('/logout', function(req, res) {
    req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});
module.exports = router;