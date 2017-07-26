//require('dotenv').config()
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var authenticate = require('./authenticate');
// var option = {
//     server: {
//         socketOptions: {
//             keepAlive: 300000,
//             connectTimeoutMS: 30000
//         }
//     },
//     replset: {
//         socketOptions: {
//             keepAlive: 300000,
//             connectTimeoutMS: 30000
//         }
//     }
// };
var config = require('./config');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});

var routes = require('./routes/index');
var userRouter = require('./routes/users');
var timetableRouter=require('./routes/timeRouter');
var announcementRouter=require('./routes/announcementRouter');
var scrapeRouter=require('./routes/scrapeRouter');
var facultyRouter= require('./routes/facultyRouter');
var assignmentRouter = require('./routes/assignmentRouter');
var upcomingRouter = require('./routes/upcomingRouter');
var markRouter = require('./routes/markRouter');
var resultRouter = require('./routes/resultRouter');
var syllabusRouter = require('./routes/syllabusRouter');
var infoRouter = require('./routes/infoRouter');
var teacherRouter = require('./routes/teacherRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// passport config
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', userRouter);
app.use('/timetable',timetableRouter);
app.use('/announcement',announcementRouter);
app.use('/scrape',scrapeRouter);
app.use('/faculty',facultyRouter);
app.use('/assignment',assignmentRouter);
app.use('/upcoming',upcomingRouter);
app.use('/marks',markRouter);
app.use('/result',resultRouter);
app.use('/syllabus',syllabusRouter);
app.use('/info',infoRouter);
app.use('/teacher',teacherRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;