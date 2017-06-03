var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var results = require('../models/result');

function mapProgramme(x){
  switch(x){
    case '077':
    case '031': return 'BACHELOR OF TECHNOLOGY (INFORMATION TECHNOLOGY)';
  }
}
function mapCollege(x){
  switch(x){
    case '104': return 'AMITY SCHOOL OF ENGINEERING & TECHNOLOGY';
    case '512':
    case '115': return 'BHARATI VIDYAPEETH COLLEGE OF ENGINEERING';
    case '768':
    case '132': return 'GURU TEGH BAHADUR INSTITUTE OF TECHNOLOGY';
    case '133': return 'HMR INSTITUTE OF TECHNOLOGY & MANAGEMENT';
    case '964':
    case '148': return 'MAHARAJA AGRASEN INSTITUTE OF TECHNOLOGY';
    case '963':
    case '150': return 'MAHARAJA SURAJMAL INSTITUTE OF TECHNOLOGY';
    case '962':
    case '156': return 'NORTHERN INDIA ENGINEERING COLLEGE';
    case '207': return 'CH. BRAHAM PRAKASH GOVERNMENT ENGINEERING COLLEGE (FORMERLY GEC)';
    case '208': return 'BHAGWAN PARSHURAM INSTITUTE OF TECHNOLOGY';

  }
}
var resultRouter = express.Router();

resultRouter.use(bodyParser.json());

resultRouter.route('/')
.get(function (req, res, next) {
    results.find(req.query).sort('-creditp').exec( function(err,resp){
      if(err) throw(err);
      resp.map(function(ele){
        ele.college=mapCollege(ele.college);
        ele.programme=mapProgramme(ele.programme);
      });
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
      resp.college=mapCollege(resp.college);
      resp.programme=mapProgramme(resp.programme);
      res.json(resp);
    });
});
module.exports=resultRouter;