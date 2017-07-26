var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var results = require('../models/result');
var Verify = require('./verify');
function mapProgramme(x){
  switch(x){
    case '077':
    case '031': return 'BACHELOR OF TECHNOLOGY (INFORMATION TECHNOLOGY)';
    case '027': return 'BACHELOR OF TECHNOLOGY (COMPUTER SCIENCE AND ENGINEERING)';
    case '028': return 'BACHELOR OF TECHNOLOGY (ELECTRONICS AND COMMUNICATIONS ENGINEERING)';
    case '036': return 'BACHELOR OF TECHNOLOGY (MECHANICAL AND AUTOMATION ENGINEERING)';
    case '049': return 'BACHELOR OF TECHNOLOGY (ELECTRICAL & ELECTRONICS ENGINEERING)';
    case '034': return 'BACHELOR OF TECHNOLOGY (CIVIL ENGINEERING)';
    case '111': return 'BACHELOR OF TECHNOLOGY (MECHANICAL ENGINEERING)';
    case '030': return 'BACHELOR OF TECHNOLOGY (INSTRUMENTATION AND CONTROL ENGINEERING)';
    case '112': return 'BACHELOR OF TECHNOLOGY (MECHATRONICS)';
    case '110': return 'BACHELOR OF TECHNOLOGY (ELECTRICAL ENGINEERING)';
    case '037': return 'BACHELOR OF TECHNOLOGY (POWER ENGINEERING)';
    case '056': return 'BACHELOR OF TECHNOLOGY (ENVIRONMENTAL ENGINEERING)';
    case '086': return 'BACHELOR OF TECHNOLOGY (TOOLS ENGINEERING)';
    default: return 'Not found';
  }
}
function mapCollege(x){
  switch(x){
    case '104': return 'AMITY SCHOOL OF ENGINEERING & TECHNOLOGY';
    case '512':
    case '115': return 'BHARATI VIDYAPEETH COLLEGE OF ENGINEERING';
    case '768':
    case '132': return 'GURU TEGH BAHADUR INSTITUTE OF TECHNOLOGY';
    case '965':
    case '133': return 'HMR INSTITUTE OF TECHNOLOGY & MANAGEMENT';
    case '964':
    case '148': return 'MAHARAJA AGRASEN INSTITUTE OF TECHNOLOGY';
    case '963':
    case '150': return 'MAHARAJA SURAJMAL INSTITUTE OF TECHNOLOGY';
    case '962':
    case '156': return 'NORTHERN INDIA ENGINEERING COLLEGE';
    case '207': return 'CH. BRAHAM PRAKASH GOVERNMENT ENGINEERING COLLEGE (FORMERLY GEC)';
    case '208': return 'BHAGWAN PARSHURAM INSTITUTE OF TECHNOLOGY';
    case '101': return 'AMBEDKAR INSTITUTE OF ADVANCED COMMUNICATION TECHNOLOGIES & RESEARCH (FORMERLY AIT)';
    case '180': return 'DELHI TECHNICAL CAMPUS, GREATER NOIDA';
    case '209': return 'G B PANT GOVT. ENGINEERING COLLEGE';
    case '255': return 'JIMS ENGINEERING MANAGEMENT TECHNICAL CAMPUS, GREATER NOIDA';
    case '551': return 'MAHAVIR SWAMI INSTITUTE OF TECHNOLOGY';
    case '702': return 'DELHI INSTITUTE OF TOOL ENGINEERING';
    case '153': return 'NATIONAL POWER TRAINING INSTITUTE';
    default: return 'Not found';
  }
}
var resultRouter = express.Router();

resultRouter.use(bodyParser.json());

resultRouter.route('/')
.get(function (req, res, next) {
    if(req.query.college=='148'||req.query.college=='964'){
      results.find({college:{ $in: [ '148', '964' ] },programme:req.query.programme,sem:req.query.sem} )
      .sort('-creditp').exec( function(err,resp){
        if(err) throw(err);
        resp.map(function(ele){
          ele.college=mapCollege(ele.college);
          ele.programme=mapProgramme(ele.programme);
        });
        res.json(resp);
      })  
    }
    else if(req.query.college=='115'||req.query.college=='512'){
      results.find({college:{ $in: [ '115', '512' ] },programme:req.query.programme,sem:req.query.sem} )
      .sort('-creditp').exec( function(err,resp){
        if(err) throw(err);
        resp.map(function(ele){
          ele.college=mapCollege(ele.college);
          ele.programme=mapProgramme(ele.programme);
        });
        res.json(resp);
      })
    }
    else if(req.query.college=='132'||req.query.college=='768'){
      results.find({college:{ $in: [ '132', '768' ] },programme:req.query.programme,sem:req.query.sem} )
      .sort('-creditp').exec( function(err,resp){
        if(err) throw(err);
        resp.map(function(ele){
          ele.college=mapCollege(ele.college);
          ele.programme=mapProgramme(ele.programme);
        });
        res.json(resp);
      })
    }
    else if(req.query.college=='962'||req.query.college=='156'){
      results.find({college:{ $in: [ '962', '156' ] },programme:req.query.programme,sem:req.query.sem} )
      .sort('-creditp').exec( function(err,resp){
        if(err) throw(err);
        resp.map(function(ele){
          ele.college=mapCollege(ele.college);
          ele.programme=mapProgramme(ele.programme);
        });
        res.json(resp);
      })
    }
    else if(req.query.college=='963'||req.query.college=='150'){
      results.find({college:{ $in: [ '963', '150' ] },programme:req.query.programme,sem:req.query.sem} )
      .sort('-creditp').exec( function(err,resp){
        if(err) throw(err);
        resp.map(function(ele){
          ele.college=mapCollege(ele.college);
          ele.programme=mapProgramme(ele.programme);
        });
        res.json(resp);
      })
    }
    else{
      results.find(req.query).sort('-creditp').exec( function(err,resp){
        if(err) throw(err);
        resp.map(function(ele){
          ele.college=mapCollege(ele.college);
          ele.programme=mapProgramme(ele.programme);
        });
        res.json(resp);
      })
    }
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
.get(Verify.verifyAppUser,function (req, res, next) {
  req.query.roll=req.params.roll;
  results.find(req.query)
    .sort('-sem')
    // .limit(1)
    .populate('marks')
    .exec(function (err, resp) {
      if(err) next(err);
      if(resp==[])
        res.json({});
      else{
        resp[0].college=mapCollege(resp[0].college);
        resp[0].programme=mapProgramme(resp[0].programme);
        res.json(resp[0]);
      }
    });
});
module.exports=resultRouter;