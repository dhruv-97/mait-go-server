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
const nodemailer = require('nodemailer');
const mae = ['yvsrsastry@gmail.com','arorakl1943@gmail.com','vkjain@mait.ac.in'
,'vednathmathur@mait.ac.in','uptanil100@gmail.com','subash.tikoo@gmail.com',
'anildahiya21@gmail.com','garimasharma9983@gmail.com','piujaink@gmail.com',
'vikasacharya4675@gmail.com','kanchan.mudgil@gmail.com','surbhi.upadhyay@gmail.com',
'naveensolanki1984@gmail.com','deshdeep31@gmail.com','vaibhavursaathi@gmail.com','rakeshsaini@mait.ac.in',
'harshmohini2211@gmail.com','mait.sidharth@gmail.com','mait.vipin@gmail.com','ashwnigoyal617@gmail.com',
'vikasajay10@gmail.com','342625@gmail.com','alok.citm@gmail.com','7ramakant@gmail.com','surabhilata.delhi@gmail.com'
,'anilhumar04@gmail.com','sonal.khurana@gmail.com',
'coolprofessor83@gmail.com','rahulchugmech@gmail.com','gautam.amit.hare@gmail.com','rachna.igit@gmail.com'];
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'dhruv.mongia@gmail.com',
        pass: 'qumuvzizgfnwfmzo'
    }
});

// setup email data with unicode symbols


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
String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};
function createAuthentication(){
  let teacherArr = [];
  faculties.findById("59791301c9953e5f7b62177f",function (err, faculty) {
    if (err) next(err);
    faculty.CSE.forEach(function(element) {
      let mailOptions = {
          from: '"Dhruv Mongia" <dhruv.mongia@gmail.com>', // sender address
          subject: 'IPU Go Admin Authentication Details', // Subject line
          text:'Hello There!!',
          html:''
      };
      let body = `<p>Experience MAIT like never before. </p>
          <p>We bring to you a cool way to access your university and interact with your students.</p>
          <p>Try our one stop destination to post announcements, assignments and much more at your convenience.</p>
          <p>features:</p>
          <ul>
            <li>Post announcements and reach out to your class</li>
            <li>Upload assignments</li>
            <li>Check student's semester wise result</li>
          </ul>
          <b>Download Now - https://play.google.com/store/apps/details?id=admin.ipugo.uddishverma.ipugoadmin</b>
          <p>Your Unique username -<b></b></p>
          <p>Password -<b></b></p>
          <p>Note - You can reset your password in the settings section of your app</p>
          <p>Thank You</p>
          `
      mailOptions.to = element.email;
      let username = element.email.substring(0,element.email.indexOf('@'));
      let password = generator.generate({
          length: 6,
          numbers: true
      });
        let i = body.indexOf('name -<b>')
        body= body.splice(i+9,0,username);
        i= body.indexOf('word -<b>');
        body= body.splice(i+9,0,password);
        mailOptions.html=body;
      transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
              console.log('Message %s sent: %s', info.messageId, info.response);
              User.register(new User({ username}),
              password, function(err, user) {
              if (err) {
                  throw(err);
              }
              user.save(function(err,user) {  
                console.log('Registration Successful!');
                
                
              });
            });
            
        });
      
      
    }, this);
    faculty.IT.forEach(function(element) {
      let mailOptions = {
          from: '"Dhruv Mongia" <dhruv.mongia@gmail.com>', // sender address
          subject: 'IPU Go Admin Authentication Details', // Subject line
          text:'Hello There!!',
          html:''
      };
      let body = `<p>Experience MAIT like never before. </p>
          <p>We bring to you a cool way to access your university and interact with your students.</p>
          <p>Try our one stop destination to post announcements, assignments and much more at your convenience.</p>
          <p>features:</p>
          <ul>
            <li>Post announcements and reach out to your class</li>
            <li>Upload assignments</li>
            <li>Check student's semester wise result</li>
          </ul>
          <b>Download Now - https://play.google.com/store/apps/details?id=admin.ipugo.uddishverma.ipugoadmin</b>
          <p>Your Unique username -<b></b></p>
          <p>Password -<b></b></p>
          <p>Note - You can reset your password in the settings section of your app</p>
          <p>Thank You</p>
          `
      mailOptions.to = element.email;
      let username = element.email.substring(0,element.email.indexOf('@'));
      let password = generator.generate({
          length: 6,
          numbers: true
      });
        let i = body.indexOf('name -<b>')
        body= body.splice(i+9,0,username);
        i= body.indexOf('word -<b>');
        body= body.splice(i+9,0,password);
        mailOptions.html=body;
      transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
              console.log('Message %s sent: %s', info.messageId, info.response);
              User.register(new User({ username}),
              password, function(err, user) {
              if (err) {
                  throw(err);
              }
              user.save(function(err,user) {  
                console.log('Registration Successful!');
                
                
              });
            });
            
        });
      
    }, this);
    faculty.ECE.forEach(function(element) {
      let mailOptions = {
          from: '"Dhruv Mongia" <dhruv.mongia@gmail.com>', // sender address
          subject: 'IPU Go Admin Authentication Details', // Subject line
          text:'Hello There!!',
          html:''
      };
      let body = `<p>Experience MAIT like never before. </p>
          <p>We bring to you a cool way to access your university and interact with your students.</p>
          <p>Try our one stop destination to post announcements, assignments and much more at your convenience.</p>
          <p>features:</p>
          <ul>
            <li>Post announcements and reach out to your class</li>
            <li>Upload assignments</li>
            <li>Check student's semester wise result</li>
          </ul>
          <b>Download Now - https://play.google.com/store/apps/details?id=admin.ipugo.uddishverma.ipugoadmin</b>
          <p>Your Unique username -<b></b></p>
          <p>Password -<b></b></p>
          <p>Note - You can reset your password in the settings section of your app</p>
          <p>Thank You</p>
          `
      mailOptions.to = element.email;
      let username = element.email.substring(0,element.email.indexOf('@'));
      let password = generator.generate({
          length: 6,
          numbers: true
      });
        let i = body.indexOf('name -<b>')
        body= body.splice(i+9,0,username);
        i= body.indexOf('word -<b>');
        body= body.splice(i+9,0,password);
        mailOptions.html=body;
      transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
              console.log('Message %s sent: %s', info.messageId, info.response);
              User.register(new User({ username}),
              password, function(err, user) {
              if (err) {
                  throw(err);
              }
              user.save(function(err,user) {  
                console.log('Registration Successful!');
                
                
              });
            });
            
        });
      
    }, this);
    faculty.EEE.forEach(function(element) {
      let mailOptions = {
          from: '"Dhruv Mongia" <dhruv.mongia@gmail.com>', // sender address
          subject: 'IPU Go Admin Authentication Details', // Subject line
          text:'Hello There!!',
          html:''
      };
      let body = `<p>Experience MAIT like never before. </p>
          <p>We bring to you a cool way to access your university and interact with your students.</p>
          <p>Try our one stop destination to post announcements, assignments and much more at your convenience.</p>
          <p>features:</p>
          <ul>
            <li>Post announcements and reach out to your class</li>
            <li>Upload assignments</li>
            <li>Check student's semester wise result</li>
          </ul>
          <b>Download Now - https://play.google.com/store/apps/details?id=admin.ipugo.uddishverma.ipugoadmin</b>
          <p>Your Unique username -<b></b></p>
          <p>Password -<b></b></p>
          <p>Note - You can reset your password in the settings section of your app</p>
          <p>Thank You</p>
          `
      mailOptions.to = element.email;
      let username = element.email.substring(0,element.email.indexOf('@'));
      if(username=='lovelygoyal')
        return;
      let password = generator.generate({
          length: 6,
          numbers: true
      });
        let i = body.indexOf('name -<b>')
        body= body.splice(i+9,0,username);
        i= body.indexOf('word -<b>');
        body= body.splice(i+9,0,password);
        mailOptions.html=body;
      transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
              console.log('Message %s sent: %s', info.messageId, info.response);
              User.register(new User({ username}),
              password, function(err, user) {
              if (err) {
                  throw(err);
              }
              user.save(function(err,user) {  
                console.log('Registration Successful!');
                
                
              });
            });
            
        });
      
    }, this);
    mae.forEach(function(element) {
      let mailOptions = {
          from: '"Dhruv Mongia" <dhruv.mongia@gmail.com>', // sender address
          subject: 'IPU Go Admin Authentication Details', // Subject line
          text:'Hello There!!',
          html:''
      };
      let body = `<p>Experience MAIT like never before. </p>
          <p>We bring to you a cool way to access your university and interact with your students.</p>
          <p>Try our one stop destination to post announcements, assignments and much more at your convenience.</p>
          <p>features:</p>
          <ul>
            <li>Post announcements and reach out to your class</li>
            <li>Upload assignments</li>
            <li>Check student's semester wise result</li>
          </ul>
          <b>Download Now - https://play.google.com/store/apps/details?id=admin.ipugo.uddishverma.ipugoadmin</b>
          <p>Your Unique username -<b></b></p>
          <p>Password -<b></b></p>
          <p>Note - You can reset your password in the settings section of your app</p>
          <p>Thank You</p>
          `
      mailOptions.to = element;
      let username = element.substring(0,element.indexOf('@'));
      if(username=='vkjain')
        return;
      let password = generator.generate({
          length: 6,
          numbers: true
      });
        let i = body.indexOf('name -<b>')
        body= body.splice(i+9,0,username);
        i= body.indexOf('word -<b>');
        body= body.splice(i+9,0,password);
        mailOptions.html=body;
      transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
              console.log('Message %s sent: %s', info.messageId, info.response);
              User.register(new User({ username}),
              password, function(err, user) {
              if (err) {
                  throw(err);
              }
              user.save(function(err,user) {  
                console.log('Registration Successful!');
                
                
              });
            });
            
        });
    }, this);
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
        student: user.student,
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});
router.post('/reset', Verify.verifyOrdinaryUser, function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      throw(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    User.findByUsername(req.body.username).then(function(sanitizedUser){
      if (sanitizedUser){
          sanitizedUser.setPassword(req.body.newPassword, function(){
              sanitizedUser.save();
              res.status(200).json({message: 'password reset successful'});
          });
      } else {
          res.status(500).json({message: 'This user does not exist'});
      }
  },function(err){
      console.error(err);
  })
  })(req,res,next);
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
router.post('/save',function(req,res) {
    User.findByUsername(req.body.username).then(function(sanitizedUser){
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
})
module.exports = router;