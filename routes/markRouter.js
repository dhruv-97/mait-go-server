var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var async = require('async');
var Marks = require('../models/mark');
var results = require('../models/result');
var arr= require('./data2.js');
function mapGrade(x){
  switch(x) {
    case 'O': return 10;
    case 'A+': return 9;
    case 'A': return 8;
    case 'B+': return 7;
    case 'B': return 6;
    case 'C': return 5;
    case 'P': return 4;
    case 'F': return 0;
  }
}
function mapSubjectName(x){
  switch(x){
    case '99201': return 'APPLIED MATHEMATICS - III';
    case '27203': return 'FOUNDATION OF COMPUTER SCIENCE';
    case '28205': return 'SWITCHING THEORY AND LOGIC DESGIN';
    case '49207': return 'CIRCUITS AND SYSTEMS';
    case '27209': return 'DATA STRUCTURE';
    case '27211': return 'COMPUTER GRAPHICS AND MULTIMEDIA';
    case '28253': return 'SWITCHING THEORY AND LOGIC DESIGN LAB';
    case '27255': return 'DATA STRUCTURE LAB';
    case '27257': return 'COMPUTER GRAPHICS AND MULTIMEDIA LAB';
    case '49257': return 'CIRCUITS AND SYSTEMS LAB';
  }
}
function mapSubjectCode(x){
    switch(x){
    case '99201': return 'ETMA201';
    case '27203': return 'ETCS203';
    case '28205': return 'ETEC205';
    case '49207': return 'ETEE207';
    case '27209': return 'ETCS209';
    case '27211': return 'ETCS211';
    case '28253': return 'ETEC253';
    case '27255': return 'ETCS255';
    case '27257': return 'ETCS257';
    case '49257': return 'ETEE257';
  }
}
function createResult(){
  let result=[{},{},{},{},{},{},{},{},{},{}];
  let info={
  };
  let infoarr=[];
  let marksarr=[];
  let totcredits=0;
  arr.forEach(function( line,index1) {
          var i=index1%5;
          if(i==0){
            result=[{},{},{},{},{},{},{},{},{},{}];
            info={
              marks:[]
            };
            totcredits=0;
            //console.log(line);
            var pieces = line.split(',');
            pieces.forEach( function(word,index2){
              if(index2==0){
                info.roll=word;
                info.sem=3;
                info.college=word.substring(3,6);
                info.programme=word.substring(6,9);
                info.batch=word.substring(9,11);
              }
              else if(index2==11){
                info.credits=word;
              }
              else{
                result[index2-1].subjectID=word.substring(0,5);
                result[index2-1].subjectCode=mapSubjectCode(result[index2-1].subjectID);
                result[index2-1].subjectName=mapSubjectName(result[index2-1].subjectID); 
                result[index2-1].credits=parseInt(word[6]);
                totcredits+=result[index2-1].credits;
              }
            })
            
          }
          else if(i==1){
            info.name=line;
            
          }
          else if(i==2){
            //console.log(line);
            var pieces = line.split(',');
            pieces.forEach( function(word,index2){
              if(index2){
                var seperate=word.split(' ');
                if(seperate[0]=='A'||seperate[0]=='C'||seperate[0]=='D')
                  result[index2-1].internal=0;
                else
                  result[index2-1].internal=parseInt(seperate[0]);
                if(seperate[1]=='A'||seperate[1]=='C'||seperate[1]=='D')
                  result[index2-1].external=0;
                else
                  result[index2-1].external=parseInt(seperate[1]);
                result[index2-1].total=result[index2-1].internal+result[index2-1].external;
              }
            })
            
            
        }
        else if (i==4){
          let creditpercentage=0,percentage=0,gpa=0;
          function makingResult(){
            var pieces = line.split(',');
            let promises=pieces.map(function(word,index2){
              return new Promise( function(resolve){
                if(word=='A'||word=='C'||word=='D'){
                result[index2].grade='F';
              }
              else{
                var seperate=word.split('(');
                result[index2].grade=seperate[1].substring(0,seperate[1].indexOf(')'));
              }
              percentage+=result[index2].total;
              creditpercentage+=result[index2].total*result[index2].credits;
              gpa+=mapGrade(result[index2].grade)*result[index2].credits;
              
              Marks.create(result[index2], function (err, mark) {
                  if (err) throw(err);
                  console.log('Mark created');
                  var id = mark._id;
                  resolve(id);
              });
              })
            });
            info.percentage=percentage/10;
            info.creditp=creditpercentage/28;
            info.gpa=gpa/28;
            infoarr.push(info);
            return Promise.all(promises);
          }
            makingResult().then( function(values){
                  marksarr.push(values);
              })
        }
    },[])
    setTimeout(function(){
      infoarr.forEach(function(element,index3){
        element.marks=marksarr[index3];
        results.create(element, function (err, result2) {
            if (err) throw(err);
            console.log('result created!');
        });
      })
    },20000);

}
function createUniversityRank(){
  results.find({}).sort('-creditp').exec( function(err,resp){
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
              console.log(result);
          });
          prev=curr.creditp;
        })
  })
}
function createCollegeRank(){
  results.find({college:'208'}).sort('-creditp').exec( function(err,resp){
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
              console.log(result);
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
MarkRouter.route('/rank')
.get(function (req, res, next) {
  createUniversityRank();
  res.send('Trying my best');
});
MarkRouter.route('/crank')
.get(function (req, res, next) {
  createCollegeRank();
  res.send('Trying my best');
});
module.exports=MarkRouter;