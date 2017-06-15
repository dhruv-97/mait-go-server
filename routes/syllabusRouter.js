var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Syllabus = require('../models/syllabi');
var syllabiRouter = express.Router();
var path = require('path')
var filePath = path.join(__dirname, 'syllabus.pdf')
var extract = require('pdf-text-extract');
var infos=[];
function extractPaperCode(x){
  return new Promise(function(resolve,reject){
    for(let i=0,j=0,code=''; i<x.length; i++){
      if(i<4 && x[i]=='–')
        continue;
      else if(x[i]!=' ' && x[i]!=':'){
        code+=x[i];
        j++;
        if(j==8)
          resolve(code);
      }
      else if(j>6 && x[i]==' ')
        resolve(code);
    }
  })
}
function verifyPaperCode(x){
  if(x.indexOf('-')!=-1 || x.indexOf('–')!=-1)
    return x;
  else
   return [x.slice(0, 4), '-', x.slice(4)].join('');
}
function extractUnit1(element){
  let k = element.indexOf('UNIT- I');
      if(k!=-1){
        let unit= element.substring(k+7,k+2000);
        unit = unit.substring(0,unit.indexOf('  '));
        return(unit);
      }
      else{
        let k = element.indexOf('UNIT-I');
        if(k!=-1){
          let unit= element.substring(k+6,k+2000);
          return(unit.substring(0,unit.indexOf('  ')));
        }
        else{
          let k = element.indexOf('UNIT – I');
          if(k!=-1){
            let unit= element.substring(k+8,k+2000);
            return(unit.substring(0,unit.indexOf('  ')));
          }
          else{
            let k = element.indexOf('Unit –I');
            if(k!=-1){
              let unit= element.substring(k+7,k+2000);
              return(unit.substring(0,unit.indexOf('  ')));
            }
            else{
              let k = element.indexOf('UNIT I');
              if(k!=-1){
                let unit= element.substring(k+6,k+2000);
                return(unit.substring(0,unit.indexOf('[')));
              }
              else{
                let k = element.indexOf('UNIT-1');
                if(k!=-1){
                  let unit= element.substring(k+6,k+2000);
                  return(unit.substring(0,unit.indexOf('[')));
                }
              }
            }
          }
        }
      }
}
function extractUnit2(element){
  let k = element.indexOf('UNIT- II');
      if(k!=-1){
        let unit= element.substring(k+8,k+2000);
        unit = unit.substring(0,unit.indexOf('['));
        return(unit);
      }
      else{
        let k = element.indexOf('UNIT-II');
        if(k!=-1){
          let unit= element.substring(k+7,k+2000);
          return(unit.substring(0,unit.indexOf('  ')));
        }
        else{
          let k = element.indexOf('UNIT – II');
          if(k!=-1){
            let unit= element.substring(k+9,k+2000);
            return(unit.substring(0,unit.indexOf('  ')));
          }
          else{
            let k = element.indexOf('Unit-II');
            if(k!=-1){
              let unit= element.substring(k+7,k+2000);
              return(unit.substring(0,unit.indexOf('  ')));
            }
            else{
              let k = element.indexOf('UNIT II');
              if(k!=-1){
                let unit= element.substring(k+7,k+2000);
                return(unit.substring(0,unit.indexOf('[')));
              }
              else{
                let k = element.indexOf('UNIT-2');
                if(k!=-1){
                  let unit= element.substring(k+6,k+2000);
                  return(unit.substring(0,unit.indexOf('[')));
                }
                else{
                  let k = element.indexOf('UNITII:');
                  if(k!=-1){
                    let unit= element.substring(k+7,k+2000);
                    return(unit.substring(0,unit.indexOf('[')));
                  }
                }
              }
            }
          }
        }
      }
}
function extractUnit3(element){
  let k = element.indexOf('UNIT- III');
      if(k!=-1){
        let unit= element.substring(k+9,k+2000);
        unit = unit.substring(0,unit.indexOf('  '));
        return(unit);
      }
      else{
        let k = element.indexOf('UNIT-III');
        if(k!=-1){
          let unit= element.substring(k+8,k+2000);
          if(unit.indexOf('(A)')==-1)
            return(unit.substring(0,unit.indexOf('  ')));
          else
            return(unit.substring(0,unit.indexOf('[N')));
        }
        else{
          let k = element.indexOf('UNIT – III');
          if(k!=-1){
            let unit= element.substring(k+10,k+2000);
            return(unit.substring(0,unit.indexOf('  ')));
          }
          else{
            let k = element.indexOf('Unit-III');
            if(k!=-1){
              let unit= element.substring(k+8,k+2000);
              return(unit.substring(0,unit.indexOf('  ')));
            }
            else{
              let k = element.indexOf('UNIT III');
              if(k!=-1){
                let unit= element.substring(k+8,k+2000);
                return(unit.substring(0,unit.indexOf('[')));
              }
              else{
                let k = element.indexOf('UNIT-3');
                if(k!=-1){
                  let unit= element.substring(k+6,k+2000);
                  return(unit.substring(0,unit.indexOf('[')));
                }
                else{
                  let k = element.indexOf('Unit – III');
                  if(k!=-1){
                    let unit= element.substring(k+6,k+2000);
                    return(unit.substring(0,unit.indexOf('[')));
                  }
                }
              }
            }
          }
        }
      }
}
function extractUnit4(element){
  let k = element.indexOf('Unit-IV');
      if(k!=-1){
        let unit= element.substring(k+7,k+2000);
        unit = unit.substring(0,unit.indexOf('  '));
        return(unit);
      }
      else{
        let k = element.indexOf('Unit – IV');
        if(k!=-1){
          let unit= element.substring(k+9,k+2000);
          return(unit.substring(0,unit.indexOf('  ')));
        }
        else{
          let k = element.indexOf('UNIT – IV');
          if(k!=-1){
            let unit= element.substring(k+9,k+2000);
            return(unit.substring(0,unit.indexOf('  ')));
          }
          else{
            let k = element.indexOf('UNIT IV');
            if(k!=-1){
              let unit= element.substring(k+7,k+2000);
              return(unit.substring(0,unit.indexOf('[')));
            }
            else{
              let k = element.indexOf('UNIT-4');
              if(k!=-1){
                let unit= element.substring(k+6,k+2000);
                return(unit.substring(0,unit.indexOf('[')));
              }
              else{
                let k = element.indexOf('UNIT-IV');
                if(k!=-1){
                  let unit= element.substring(k+7,k+2000);
                   if(unit.indexOf('I.')==-1)
                    return(unit.substring(0,unit.indexOf('[')));
                  else
                    return(unit.substring(0,unit.indexOf('[N')));
                }
              }
            }
          }
        }
      }
}

syllabiRouter.use(bodyParser.json());

syllabiRouter.route('/')
.get(function (req, res, next) {
    Syllabus.find({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
})

.post(function (req, res, next) {
    Syllabus.create(req.body, function (err, syllabi) {
        if (err) next(err);
        console.log('syllabi created!');
        var id = syllabi._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the syllabi with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Syllabus.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});
syllabiRouter.route('/:syllabiId')
.get(function (req, res, next) {
    Syllabus.findById(req.params.syllabiId,function (err, syllabi) {
        if (err) next(err);
        res.json(syllabi);
        });
})

.put(function (req, res, next) {
    Syllabus.findByIdAndUpdate(req.params.syllabiId, {
        $set: req.body
    }, {
        new: true
    }, function (err, syllabi) {
        if (err) next(err);
        res.json(syllabi);
    });
})

.delete(function (req, res, next) {
        Syllabus.findByIdAndRemove(req.params.syllabiId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});
syllabiRouter.route('/create/syllabus')
.get(function (req, res, next){
  extract(filePath, function (err, pages) {
    if (err) {
      console.dir(err)
      return
    }
    pages.forEach(function(element,index) {
      //console.log(pages);
      let sem=1,year=1,programme='common';
      if(index<3 || index>25)
        return;
      else if (index>13)
        sem=2;
        let paperCode, paperName, unit1, unit2, unit3, unit4;
        let i= element.indexOf('Paper Code');
        if(i!=-1){     
              let paper = element.substring(i+10,i+30);
              extractPaperCode(paper).then(function(temp){
                paperCode=verifyPaperCode(temp);
                if(paperName.indexOf('Lab')==-1 && paperName.indexOf('Workshop')==-1){
                  let info = {sem,year,programme,paperCode,paperName, unit1, unit2, unit3, unit4};
                  infos.push(info);
                }
                else
                  console.log(paperCode,sem,paperName);
              });
              let j = element.indexOf('Paper :');
              if(j==-1){
                j= element.indexOf('Paper:');
                if(j!=-1){
                  let paper = element.substring(j+7,j+50);
                  paperName=paper.substring(0,paper.indexOf('  '));
                  if(paperName.indexOf('Lab')==-1 && paperName.indexOf('Workshop')==-1){
                    unit1 = extractUnit1(element);
                    unit2 = extractUnit2(element);
                    unit3 = extractUnit3(element);
                    unit4 = extractUnit4(element);
                      
                  }
                }
              }
              else{
                let paper = element.substring(j+8,j+50);
                paperName=paper.substring(0,paper.indexOf('  '));
                if(paperName.indexOf('Lab')==-1 && paperName.indexOf('Workshop')==-1){
                    unit1 = extractUnit1(element);
                    unit2 = extractUnit2(element);
                    unit3 = extractUnit3(element);
                    unit4 = extractUnit4(element);
                  }
              }
        }
    }, this);
  })
  setTimeout(function(){
    infos.forEach(function(yo){
      //console.log(yo);
      Syllabus.create(yo, function (err, syllabi) {
                      if (err) {
                        if (err.name == 'ValidationError') {
                          for (field in err.errors) {
                            console.log(field);
                          }
                        } else {
                            console.log('Help please');
                        }
                      }
                      console.log('syllabi created!');
                  });
    })
  },5000)
  res.send('Trying my best');
});

module.exports=syllabiRouter;