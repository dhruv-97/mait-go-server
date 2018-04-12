var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Marks = require('../models/mark');
var results = require('../models/result');
var map = require('../parsing/mapping.js');
var data = require('../parsing/data.js');
let programmes = ['031','027','028','036','049','034','030'];
let lepro = ['077','072','073','074','078','079','076']
function programmeMapper(x){
  switch(x){
    case '031': return 0;
    case '027': return 1;
    case '028': return 2;
    case '036': return 3;
    case '049': return 4;
    case '034': return 5;
    case '030': return 6;
  }
}
function batchMapper(x){
  switch(x){
    case '17': return 0;
    case '16': return 1;
    case '15': return 2;
    case '14': return 3;
  }
}
let batches = ['17','16','15','14'];
let sems = [1,2,3,4,5,6,7];
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
       let sem,pro,batch;
      data.forEach(function(element,index3){
        if(index3==0){
          sem=element.sem;
          pro=element.programme;
          batch=element.batch;
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
        if(batch=='17'){
          createUniversityRank(sem,pro,programmeMapper(pro),batch,batchMapper(batch),false);
        createCollegeRank('207',sem,pro,programmeMapper(pro),batch,batchMapper(batch),false);
        createCollegeRank('208',sem,pro,programmeMapper(pro),batch,batchMapper(batch),false);
        createCollegeRank('104',sem,pro,programmeMapper(pro),batch,batchMapper(batch),false);
        createCollegeRank('101',sem,pro,programmeMapper(pro),batch,batchMapper(batch),false);
        createCollegeRank('180',sem,pro,programmeMapper(pro),batch,batchMapper(batch),false);
        createCollegeRank('209',sem,pro,programmeMapper(pro),batch,batchMapper(batch),false);
        createCollegeRank('255',sem,pro,programmeMapper(pro),batch,batchMapper(batch),false);
        createCollegeRank('551',sem,pro,programmeMapper(pro),batch,batchMapper(batch),false);
        createCollegeRank('702',sem,pro,programmeMapper(pro),batch,batchMapper(batch),false);
        createCollegeRank('153',sem,pro,programmeMapper(pro),batch,batchMapper(batch),false);
        createCollegeRank2('512','115',sem,pro,programmeMapper(pro),batch,batchMapper(batch),false);
        createCollegeRank2('964','148',sem,pro,programmeMapper(pro),batch,batchMapper(batch),false);
        createCollegeRank2('768','132',sem,pro,programmeMapper(pro),batch,batchMapper(batch),false);
        createCollegeRank2('963','150',sem,pro,programmeMapper(pro),batch,batchMapper(batch),false);
        createCollegeRank2('962','156',sem,pro,programmeMapper(pro),batch,batchMapper(batch),false);
        createCollegeRank2('965','133',sem,pro,programmeMapper(pro),batch,batchMapper(batch),false);
        }
        else{
          createUniversityRank(sem,pro,programmeMapper(pro),batch,batchMapper(batch),true);
          createCollegeRank('207',sem,pro,programmeMapper(pro),batch,batchMapper(batch),true);
          createCollegeRank('208',sem,pro,programmeMapper(pro),batch,batchMapper(batch),true);
          createCollegeRank('104',sem,pro,programmeMapper(pro),batch,batchMapper(batch),true);
          createCollegeRank('101',sem,pro,programmeMapper(pro),batch,batchMapper(batch),true);
          createCollegeRank('180',sem,pro,programmeMapper(pro),batch,batchMapper(batch),true);
          createCollegeRank('209',sem,pro,programmeMapper(pro),batch,batchMapper(batch),true);
          createCollegeRank('255',sem,pro,programmeMapper(pro),batch,batchMapper(batch),true);
          createCollegeRank('551',sem,pro,programmeMapper(pro),batch,batchMapper(batch),true);
          createCollegeRank('702',sem,pro,programmeMapper(pro),batch,batchMapper(batch),true);
          createCollegeRank('153',sem,pro,programmeMapper(pro),batch,batchMapper(batch),true);
          createCollegeRank2('512','115',sem,pro,programmeMapper(pro),batch,batchMapper(batch),true);
          createCollegeRank2('964','148',sem,pro,programmeMapper(pro),batch,batchMapper(batch),true);
          createCollegeRank2('768','132',sem,pro,programmeMapper(pro),batch,batchMapper(batch),true);
          createCollegeRank2('963','150',sem,pro,programmeMapper(pro),batch,batchMapper(batch),true);
          createCollegeRank2('962','156',sem,pro,programmeMapper(pro),batch,batchMapper(batch),true);
          createCollegeRank2('965','133',sem,pro,programmeMapper(pro),batch,batchMapper(batch),true);

        }
        
        console.log('We are done');
      },10000);
    },10000);
}
function createUniversityRank(x,y,yi,w,wi,le){
  if(le==false){
      results.find({sem:x,programme:y,batch:w}).sort('-creditp').exec( function(err,resp){
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
              if (err) throw(err);
          });
          prev=curr.creditp;
        })
  })
  }
  else{
    results.find({sem:x,$or:[{programme:y,batch:w},{programme:lepro[yi],batch:batches[wi-1]}]}).sort('-creditp').exec( function(err,resp){
          if(err) throw(err);
          var rank=0,prev=101,trank;
          resp.forEach(function(curr){
            console.log(curr);
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
                if (err) throw(err);
            });
            prev=curr.creditp;
          })
    })
  }
  
}
function createCollegeRank(x,y,z,zi,w,wi,le){
  if(le==false){
    results.find({college:x,sem:y,programme:z,batch:w}).sort('-creditp').exec( function(err,resp){
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
              if (err) throw(err);
          });
          prev=curr.creditp;
        })
  })
  }
  else{
    results.find({college:x,sem:y,$or:[{programme:z,batch:w},{programme:lepro[zi],batch:batches[wi-1]}]}).sort('-creditp').exec( function(err,resp){
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
                if (err) throw(err);
            });
            prev=curr.creditp;
          })
    })
  }
  
}
function createCollegeRank2(a,b,y,z,zi,w,wi,le){
  if(le==false){
    results.find({college:{ $in: [ a, b ] },sem:y,programme:z,batch:w}).sort('-creditp').exec( function(err,resp){
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
            if (err) throw(err);
        });
        prev=curr.creditp;
      })
})
  }
  else{
    results.find({college:{ $in: [ a, b ] },sem:y,$or:[{programme:z,batch:w},{programme:lepro[zi],batch:batches[wi-1]}]}).sort('-creditp').exec( function(err,resp){
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
            if (err) throw(err);
        });
        prev=curr.creditp;
      })
})
  }
  
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
.get(function(req,res,next){
  batches.forEach(function(batch,bi) {
    programmes.forEach(function(pro,pi) {
      
        // if(bi==0){
          createUniversityRank(1,pro,pi,batch,bi,false);
          createCollegeRank('207',1,pro,pi,batch,bi,false);
          createCollegeRank('208',1,pro,pi,batch,bi,false);
          createCollegeRank('104',1,pro,pi,batch,bi,false);
          createCollegeRank('101',1,pro,pi,batch,bi,false);
          createCollegeRank('180',1,pro,pi,batch,bi,false);
          createCollegeRank('209',1,pro,pi,batch,bi,false);
          createCollegeRank('255',1,pro,pi,batch,bi,false);
          createCollegeRank('551',1,pro,pi,batch,bi,false);
          createCollegeRank('702',1,pro,pi,batch,bi,false);
          createCollegeRank('153',1,pro,pi,batch,bi,false);
          createCollegeRank2('512','115',1,pro,pi,batch,bi,false);
          createCollegeRank2('964','148',1,pro,pi,batch,bi,false);
          createCollegeRank2('768','132',1,pro,pi,batch,bi,false);
          createCollegeRank2('963','150',1,pro,pi,batch,bi,false);
          createCollegeRank2('962','156',1,pro,pi,batch,bi,false);
          createCollegeRank2('965','133',1,pro,pi,batch,bi,false);
        // }
        // else{
        //   createUniversityRank(1,pro,pi,batch,bi,true);
        //   createCollegeRank('207',1,pro,pi,batch,bi,true);
        //   createCollegeRank('208',1,pro,pi,batch,bi,true);
        //   createCollegeRank('104',1,pro,pi,batch,bi,true);
        //   createCollegeRank('101',1,pro,pi,batch,bi,true);
        //   createCollegeRank('180',1,pro,pi,batch,bi,true);
        //   createCollegeRank('209',1,pro,pi,batch,bi,true);
        //   createCollegeRank('255',1,pro,pi,batch,bi,true);
        //   createCollegeRank('551',1,pro,pi,batch,bi,true);
        //   createCollegeRank('702',1,pro,pi,batch,bi,true);
        //   createCollegeRank('153',1,pro,pi,batch,bi,true);
        //   createCollegeRank2('512','115',1,pro,pi,batch,bi,true);
        //   createCollegeRank2('964','148',1,pro,pi,batch,bi,true);
        //   createCollegeRank2('768','132',1,pro,pi,batch,bi,true);
        //   createCollegeRank2('963','150',1,pro,pi,batch,bi,true);
        //   createCollegeRank2('962','156',1,pro,pi,batch,bi,true);
        //   createCollegeRank2('965','133',1,pro,pi,batch,bi,true);

        // }
        
        console.log('We are done');
     
    }, this);  
  }, this);
  res.send('Trying my best');
})
module.exports=MarkRouter;