var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio= require('cheerio');
var FormData = require('form-data');
var Verify=require('./verify');
var notices = require('../models/notice');
var datesheets = require('../models/datesheet');
var results = require('../models/result');
var Users = require('../models/user');
var unirest = require('unirest');
function scrapeNotices(){
    request('http://ipu.ac.in/exam_notices.php', function(err,resp,body){
        if(err)
            throw err;
        var $ = cheerio.load(body);
        var check=true;
        $('.table-box td a').each(function(){
            var content = $(this);
            var contentText = content.text();
            if(contentText.toLowerCase().indexOf('b. tech')!=-1 || contentText.toLowerCase().indexOf("b.tech")!=-1){
                //console.log(contentText);
                var urlText = $(this).attr('href');
                    notices.find({'url':urlText}).sort('-createdAt').limit(1).exec(function (err, notice){
                        if(check==false)
                            return false;
                        if(notice.length==0){
                            notices.create({"notice":contentText,"url":urlText}, function (err, notice) {
                                if (err) next(err);
                                // Users.find({},function(err,response){
                                //     //console.log(response);
                                //     response.forEach(function(element) {
                                //         let token = element.token;
                                //         unirest.post('https://fcm.googleapis.com/fcm/send')
                                //         .headers({'Content-Type': 'application/json',
                                //                 'Authorization': 'key=AAAAiS4AtkA:APA91bHv6islehAx0nRsakGfz8rEahTFa7DFzPVHipDAV_8__v5utSn4e3PVi2CCNph27-BEmK3Tk_uh47Etj9JF6ppXd2OKKNNIvdQgEhXBH16bk6b42-IHjn_sVlBR06lDU4k9MCe9'})
                                //         .send({ "to":token,
                                //                 "data": {
                                //                 "title":"New Notice!",
                                //                 "body": "There is a new notice. Click here to check out."
                                //                 } })
                                //         .end(function (response) {
                                //         console.log(response.body);
                                //         });
                                //     }, this);
                                // });
                                console.log('notice created!');
                            });
                        }
                        else{
                            console.log('Still here');
                            check=false;
                        }
                    })
                }
            });
        })
}
scrapeNotices();
setInterval(function () {
    scrapeNotices();
     
},3600000);
function scrapeDatesheets(){
    request('http://ipu.ac.in/exam_datesheet.php', function(err,resp,body){
        if(err)
            throw err;
        var $ = cheerio.load(body);
        var check=true;
        $('.table-box td a').each(function(){
            var content = $(this);
            var contentText = content.text();
            if(contentText.toLowerCase().indexOf('b. tech')!=-1 || contentText.toLowerCase().indexOf("b.tech")!=-1){
                //console.log(contentText);
                var urlText = $(this).attr('href');
                    datesheets.find({'url':urlText}).sort('-createdAt').limit(1).exec(function (err, datesheet){
                        if(check==false)
                            return false;
                        if(datesheet.length==0){
                            datesheets.create({"datesheet":contentText,"url":urlText}, function (err, datesheet) {
                                if (err) throw(err);
                                // Users.find({},function(err,response){
                                //     //console.log(response);
                                //     response.forEach(function(element) {
                                //         let token = element.token;
                                //         unirest.post('https://fcm.googleapis.com/fcm/send')
                                //         .headers({'Content-Type': 'application/json',
                                //                 'Authorization': 'key=AAAAiS4AtkA:APA91bHv6islehAx0nRsakGfz8rEahTFa7DFzPVHipDAV_8__v5utSn4e3PVi2CCNph27-BEmK3Tk_uh47Etj9JF6ppXd2OKKNNIvdQgEhXBH16bk6b42-IHjn_sVlBR06lDU4k9MCe9'})
                                //         .send({ "to":token,
                                //                 "data": {
                                //                 "title":"New Notice!",
                                //                 "body": "There is a new datesheet. Click here to check out."
                                //                 } })
                                //         .end(function (response) {
                                //         console.log(response.body);
                                //         });
                                //     }, this);
                                // });
                                console.log('datesheet created!');
                            });
                        }
                        else{
                            console.log('Still here');
                            check=false;
                        }
                    })
                }
            });
        })
}
scrapeDatesheets();
setInterval(function () {
    scrapeDatesheets();
     
},3700000);
var scrapeRouter = express.Router();

scrapeRouter.use(bodyParser.json());

scrapeRouter.route('/')
.get(function (req, res, next) {
    res.send('Welcome to scrape world');
})

scrapeRouter.route('/notices')
.get(Verify.verifyAppUser,function (req, res, next) {
    notices.find({}).sort('-createdAt').exec(function (err, notices) {
        if (err) throw err;
        let data = {};
        data.exams=notices;
        datesheets.find({}).sort('-createdAt').exec(function (err, datesheet) {
            if (err) throw err;
            data.datesheets=datesheet;
            res.json(data);
        });
    });
})

scrapeRouter.route('/datesheets')
.get(Verify.verifyAppUser,function (req, res, next) {
    datesheets.find({}).sort('createdAt').exec(function (err, datesheet) {
        if (err) throw err;
        res.json(datesheet);
    });
})
scrapeRouter.route('/faculty')
.get(Verify.verifyAppUser,function (req, res, next) {
    var faculty=[];
    request('http://eee.mait.ac.in/index.php/people/faculty', function(err,resp,body){
        if(err)
            throw err;
        var $ = cheerio.load(body);
        var teacher = {
            name:'',
            designation: '',
            qualification:'',
            exp:'',
            img:''
        }
        var i; var arr=[];
        for(i = 0; i < $('.article-content td a').length; i++)  {
                var facultyName;
                facultyName = $('.article-content td a').eq(i).text();
                arr.push(facultyName);
        }
        i=0;
        setTimeout(function(){ $('.rticle-content table tr td table tr td a span').each(function()   {
                     var info = $(this);
                     var infoText = info.text();
                     console.log(infoText);
                     if(infoText.indexOf('Designation') > -1)
                        teacher.designation=infoText.substring(25,infoText.length);
                        
                     else if(infoText.indexOf('Qualification') > -1)
                        teacher.qualification=infoText.substring(27,infoText.length);
                     else if(infoText.indexOf('Total') > -1){
                        teacher.exp=infoText.substring(54,infoText.length);
                        teacher.name=arr[i];
                        i++;
                        teacher.img='img/EEE/'+i+'.png';
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
module.exports=scrapeRouter;