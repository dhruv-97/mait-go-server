var express = require('express');
var fs = require('fs');
var passport = require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../models/teacher');
var faculties = require('../models/faculty');
var Verify    = require('./verify');
var generator = require('generate-password');
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
function createAuthentication(){
  let teacherArr = [];
  faculties.findById("59791301c9953e5f7b62177f",function (err, faculty) {
    if (err) next(err);
    faculty.CSE.forEach(function(element) {
      let username = element.email.substring(0,element.email.indexOf('@'));
      let password = generator.generate({
          length: 6,
          numbers: true
      });
      User.register(new User({ username}),
        password, function(err, user) {
        if (err) {
            throw(err);
        }
        user.save(function(err,user) {  
          console.log('Registration Successful!');
          teacherArr.push({username,password});
        });
      });
    }, this);
    faculty.IT.forEach(function(element) {
      let username = element.email.substring(0,element.email.indexOf('@'));
      let password = generator.generate({
          length: 6,
          numbers: true
      });
      User.register(new User({ username}),
        password, function(err, user) {
        if (err) {
            throw(err);
        }
        user.save(function(err,user) {

                console.log('Registration Successful!');
                teacherArr.push({username,password});
        });
      });
    }, this);
    faculty.ECE.forEach(function(element) {
      let username = element.email.substring(0,element.email.indexOf('@'));
      let password = generator.generate({
          length: 6,
          numbers: true
      });
      User.register(new User({ username}),
        password, function(err, user) {
        if (err) {
            throw(err);
        }
        user.save(function(err,user) {
                console.log('Registration Successful!');
                teacherArr.push({username,password});
        });
      });
    }, this);
    setTimeout(function(){
      console.log(teacherArr);
      fs.createWriteStream('../parsing/teacher.json').write(JSON.stringify(teacherArr));
    },30000);
  });
}

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
router.post('/reset', Verify.verifyOrdinaryUser, function(req, res) {
    userModel.findByUsername(req.body.username).then(function(sanitizedUser){
      if (sanitizedUser){
          sanitizedUser.setPassword(req.body.password, function(){
              sanitizedUser.save();
              res.status(200).json({message: 'password reset successful'});
          });
      } else {
          res.status(500).json({message: 'This user does not exist'});
      }
  },function(err){
      console.error(err);
  })
});
router.get('/logout', function(req, res) {
    req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});
router.get('/create', function(req, res) {
    createAuthentication();
    res.send('Trying my best');
});
module.exports = router;