var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Marks = require('../models/mark');
var results = require('../models/result');
// var map = require('../parsing/mapping.js');
// var data = require('../parsing/data.js');

function createResult(){
  let marksarr=[];
  data.forEach(function(element) {
  function makingResult(){
    let promises=element.marks.map(function(mark){
      return new Promise( function(resolve){
        mark.subjectCode=map.mapSubjectCode(mark.subjectID);
        mark.subjectName=map.mapSubjectName(mark.subjectID);
        Marks.create(mark, function (err, markObj) {
                  if (err){
                    console.log(element,markObj); 
                    throw(err);
                  }
                  console.log('Mark created');
                  var id = markObj._id;
                  resolve(id);
              });
        })
      },this);
      return Promise.all(promises);
    }
    makingResult().then( function(values){
        marksarr.push(values);
    })
  }, this);
  setTimeout(function(){
       let sem,pro;
      data.forEach(function(element,index3){
        if(index3==0){
          sem=element.sem;
          pro=element.programme;
        }
        element.marks=marksarr[index3];
        results.create(element, function (err, result2) {
            if (err){ 
              console.log(element);
              throw(err);
            }
            console.log('result created!');
        });
      },this);
      setTimeout(function(){
        createUniversityRank(sem,pro);
        createCollegeRank('133',sem,pro);
        createCollegeRank('207',sem,pro);
        createCollegeRank('208',sem,pro);
        createCollegeRank('104',sem,pro);
        createCollegeRank2('512','115',sem,pro);
        createCollegeRank2('964','148',sem,pro);
        createCollegeRank2('768','132',sem,pro);
        createCollegeRank2('963','150',sem,pro);
        createCollegeRank2('962','156',sem,pro);
      },10000);
    },10000);
}
function createUniversityRank(x,y){
  results.find({sem:x,programme:y}).sort('-creditp').exec( function(err,resp){
        if(err) throw(err);
        var rank=0,prev=101,trank;
        resp.forEach(function(curr){
          if(prev==curr.creditp)
            trank=rank;
          else{
            trank=rank+1;
            rank++;
          }
          results.findByIdAndUpdate(curr._id, {
              $set: {"urank":trank}
          }, {
              new: true
          }, function (err, result) {
              if (err) next(err);
          });
          prev=curr.creditp;
        })
  })
}
function createCollegeRank(x,y,z){
  results.find({college:x,sem:y,programme:z}).sort('-creditp').exec( function(err,resp){
        if(err) throw(err);
        var rank=0,prev=101,trank;
        resp.forEach(function(curr){
          if(prev==curr.creditp)
            trank=rank;
          else{
            trank=rank+1;
            rank++;
          }
          results.findByIdAndUpdate(curr._id, {
              $set: {"crank":trank}
          }, {
              new: true
          }, function (err, result) {
              if (err) next(err);
          });
          prev=curr.creditp;
        })
  })
}
function createCollegeRank2(a,b,y,z){
  results.find({college:{ $in: [ a, b ] },sem:y,programme:z}).sort('-creditp').exec( function(err,resp){
        if(err) throw(err);
        var rank=0,prev=101,trank;
        resp.forEach(function(curr){
          if(prev==curr.creditp)
            trank=rank;
          else{
            trank=rank+1;
            rank++;
          }
          results.findByIdAndUpdate(curr._id, {
              $set: {"crank":trank}
          }, {
              new: true
          }, function (err, result) {
              if (err) next(err);
          });
          prev=curr.creditp;
        })
  })
}

var MarkRouter = express.Router();

MarkRouter.use(bodyParser.json());
MarkRouter.route('/')
.get(function (req, res, next) {
    Marks.find({}, function (err, marks) {
        if (err) throw err;
        res.json(marks);
    });
})
.post(function (req, res, next) {
    Marks.create(req.body, function (err, mark) {
        if (err) next(err);
        console.log('mark created!');
        res.json(mark);
    });
})
.delete(function (req, res, next) {
    Marks.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});
MarkRouter.route('/create')
.get(function (req, res, next) {
  createResult();
  res.send('Trying my best');
});
module.exports=MarkRouter;