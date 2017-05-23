var express = require('express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request');
var cheerio= require('cheerio');
var FormData = require('form-data');

var informations = require('../models/info');
var results = require('../models/result');
var Verify=require('./verify');

function mkdataCookie(cookie) {
    var t, j;
    cookie = cookie.toString().replace(/,([^ ])/g, ",[12],$1").split(",[12],");
    for (var x = 0; x < cookie.length; x++) {
        cookie[x] = cookie[x].split("; ");
        j = cookie[x][0].split("=");
        t = {
            key: j[0],
            value: j[1]
        };
        for (var i = 1; i < cookie[x].length; i++) {
            j = cookie[x][i].split("=");
            t[j[0]] = j[1];
        }
        cookie[x] = t;
    }
    return cookie;
}
function dataCookieToString(dataCookie) {
    var t = "";
    for (var x = 0; x < dataCookie.length; x++) {
        t += ((t != "") ? "; " : "") + dataCookie[x].key + "=" + dataCookie[x].value;
    }
    return t;
}

var infoRouter = express.Router();

infoRouter.use(bodyParser.json());

infoRouter.route('/')
.get(function (req, res, next) {
    informations.findOne(req.query, function (err, infos) {
        if (err) throw err;
        if(infos==null){
          var form = new FormData();
            var marks=[];
            var final={
                    percentage: 100,
                    creditp: 100,
                    marks: []
            };
            var infoText='';
            var infoj={
                roll: req.query.roll,
                name: '',
                college:'',
                stream:''
            };
            form.append('Roll_No', req.query.roll);
            form.submit('http://ipuresult.com/index.php', function(err, res2) {
              // res2 – response object (http.IncomingMessage)  // 
                res2.resume();
                var coo= mkdataCookie(res2.headers['set-cookie']);
                var cookie=dataCookieToString(coo);
                //console.log(cookie);
                request({
                            url: "http://ipuresult.com/student_marks.php",
                            method: "GET",
                            json: true,
                            headers: {"Cookie": cookie}
                    }, function (error, response, body){
                
                    if(error)
                        throw err;
                    var $ = cheerio.load(response.body);
                    var info =$('table tr:nth-child(1)>td');
                    infoText=info.text();
                    var i= infoText.indexOf('College:');
                    infoj.name= infoText.substring(40,i-1);
                    infoj.college=infoText.substring(i+11,116);
                    infoj.stream=infoText.substring(126,infoText.length);
                    res.json(infoj);
                    var mark ={
                        subjectID:'',
                        subjectCode:'',
                        subjectName:'',
                        internal:'',
                        external:'',
                        total:'',
                        credits:'' 
                    };
                    var i=0,score=0,score2=0,iscore,j=0,tcredit=0;
                    $('.tftable td').each(function(){
                        var content = $(this);
                        var contentText = content.text();
                        //console.log(contentText);
                        if(i==0)
                            mark.subjectID=contentText;
                        else if(i==1)
                            mark.subjectCode=contentText;
                        else if(i==2)
                            mark.subjectName=contentText;
                        else if(i==3)
                            mark.internal=contentText;
                        else if(i==4)
                            mark.external=contentText;
                        else if(i==5){
                            mark.total=contentText;
                            iscore=parseInt(contentText);
                            score+=iscore;
                            j++;
                        }
                        else if(i==6){
                            mark.credits=contentText;
                            //console.log(mark);
                            tcredit+=parseInt(contentText);
                            score2+=iscore*parseInt(contentText);
                            marks.push(mark);
                            mark ={
                                subjectID:'',
                                subjectCode:'',
                                subjectName:'',
                                internal:'',
                                external:'',
                                total:'',
                                credits:'' 
                            };
                            i=-1;
                        }
                        i++;

                });
                final.percentage=(score/j).toFixed(2);
                final.creditp=(score2/tcredit).toFixed(2);
                final.marks=marks;
                results.create(final, function (err, result) {
                                if (err) next(err);
                                console.log('result created!');
                                infoj.result=result._id;
                                informations.create(infoj, function (err, infoObject) {
                                    if (err) next(err);
                                    console.log('Info created!');
                                    //res.json(infoj);
                                });
                            });

                });
            });
        }
        else
          res.json(infos);
    });
})

.post(function (req, res, next) {
    informations.create(req.body, function (err, info) {
        if (err) next(err);
        console.log('info created!');
        var id = info._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the info with id: ' + id);
    });
})

.delete(function (req, res, next) {
    informations.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

infoRouter.route('/:infoId')
.get(function (req, res, next) {
    var sem= req.params.infoId[0];
    var group= req.params.infoId.substring(1,req.params.infoId.length);
    //console.log(sem);
    //console.log(group);
    informations.findOne({"sem":sem,"group":group},function (err, info) {
        if (err) next(err);
        res.json(info);
        });
})

.put(function (req, res, next) {
    informations.findByIdAndUpdate(req.params.infoId, {
        $set: req.body
    }, {
        new: true
    }, function (err, info) {
        if (err) next(err);
        res.json(info);
    });
})

.delete(function (req, res, next) {
        informations.findByIdAndRemove(req.params.infoId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});
module.exports=infoRouter;