var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio= require('cheerio');
var FormData = require('form-data');
var Verify=require('./verify');
var notices = require('../models/notice');
var results = require('../models/result');
function scrapeNotices(){
    notices.remove({}, function (err, resp) {
        if (err) next(err);
        request('http://ipu.ac.in/exam_notices.php', function(err,resp,body){
            if(err)
                throw err;
            var $ = cheerio.load(body);
            $('.table-box td a').each(function(){
                var content = $(this);
                var contentText = content.text();
                if(contentText.search('B. Tech')!=-1 || contentText.search("B.Tech")!=-1){
                    var urlText = $(this).attr('href');
                    notices.create({"notice":contentText,"url":urlText}, function (err, notice) {
                        if (err) next(err);
                        //console.log('notice created!');
                    });
                }
            });
        })
    });
}
scrapeNotices();
setInterval(function () {
    scrapeNotices();
     
},3600000);
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

var scrapeRouter = express.Router();

scrapeRouter.use(bodyParser.json());

scrapeRouter.route('/')
.get(function (req, res, next) {
    res.send('Welcome to scrape world');
})

scrapeRouter.route('/notices')
.get(function (req, res, next) {
    notices.find({}, function (err, notices) {
        if (err) throw err;
        res.json(notices);
    });
})

scrapeRouter.route('/result/:rollNo')
.get(function (req, res, next) {
    results.findOne({"roll":req.params.rollNo},function (err, result) {
        if (err) next(err);
        if(result!=null){
            res.json(result);
            console.log('if invoked');
        }
        else{
            console.log('else invoked');
            var form = new FormData();
            var marks=[];
            var final={
                    roll: req.params.rollNo,
                    percentage: 100,
                    creditp: 100,
                    marks: []
            };
            var infoText='';
            var semText='';
            form.append('Roll_No', req.params.rollNo);
            form.submit('http://ipuresult.com/index.php', function(err, res) {
              // res – response object (http.IncomingMessage)  // 
                res.resume();
                var coo= mkdataCookie(res.headers['set-cookie']);
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
                    
                    var mark ={
                        subjectID:'',
                        subjectCode:'',
                        subjectName:'',
                        internal:'',
                        external:'',
                        total:'',
                        credits:'' 
                    };
                    var info =$('table tr:nth-child(1)>td');
                    infoText=info.text();
                    var sem =$('table>tr:nth-child(0)>th>div');
                    semText=sem.text();
                    console.log(semText);
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
                //console.log(score);
                //console.log(j);
                final.percentage=(score/j).toFixed(2);
                final.creditp=(score2/tcredit).toFixed(2);
                final.marks=marks;
                results.create(final, function (err, result) {
                                if (err) next(err);
                                console.log('result created!');
                            });

                });
            });
            setTimeout(function(){ res.json(final) }, 3000);

                }
    });
    
})

scrapeRouter.route('/faculty')
.get(function (req, res, next) {
    var faculty=[];
    request('http://ece.mait.ac.in/index.php/people/faculty', function(err,resp,body){
        if(err)
            throw err;
        var $ = cheerio.load(body);
        var teacher = {
            name:'',
            designation: '',
            qualification:'',
            exp:''
        }
        var i; var arr=[];
        for(i = 0; i < $('.article-content td a').length; i++)  {
                var facultyName;
                facultyName = $('.article-content td a').eq(i).text();
                arr.push(facultyName);
        }
        i=0;
        setTimeout(function(){ $('.article-content table tr td table tr td:nth-child(2) p').each(function()   {
                     var info = $(this);
                     var infoText = info.text();
                     if(infoText.indexOf('Designation') > -1)
                        teacher.designation=infoText.substring(24,infoText.length);
                        
                     else if(infoText.indexOf('Qualification') > -1)
                        teacher.qualification=infoText.substring(26,infoText.length);
                     else if(infoText.indexOf('Total') > -1){
                        teacher.exp=infoText.substring(38,infoText.length);
                        teacher.name=arr[i];
                        i++;
                        faculty.push(teacher);
                        teacher = {
                            name:'',
                            designation: '',
                            qualification:'',
                            exp:''
                        };
                     }
          
                 }); }, 2000);
        
        
    })
    setTimeout(function(){ res.json(faculty) }, 4000);
})
scrapeRouter.route('/info/:rollNo')
.get(function (req, res, next) {
    var form = new FormData();
    var infoText='';
    var infoj={
        roll: req.params.rollNo,
        name: '',
        college:'',
        stream:''
    };
    form.append('Roll_No', req.params.rollNo);
    form.submit('http://ipuresult.com/index.php', function(err, res) {
      // res – response object (http.IncomingMessage)  // 
        res.resume();
        var coo= mkdataCookie(res.headers['set-cookie']);
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
        });
    });
    setTimeout(function(){ res.json(infoj) }, 5000);
})

module.exports=scrapeRouter;