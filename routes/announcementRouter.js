var express = require('express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var Announcements = require('../models/announcements');
var Users = require('../models/user');
var unirest = require('unirest');

var headers =  {
    'Content-Type': 'application/json',
    'Authorization': 'key=AAAAiS4AtkA:APA91bGunMyKw0ite-QmK_Vnma39aHLp5uMw04o0gODo4SYjq3ujWiWcMPhEOHyDLV_oF6xdMRPU9QIbOeMbgIMy_AfiIUZJR5DiLRabbCzQBF894jtGXe7L0JvyMNfEezzNWt-ay8I7'
};
var body ={        
 	
};
var options = {
  url: 'https://fcm.googleapis.com/fcm/send',
  method: 'POST',
  headers: headers
};
var Verify=require('./verify');

function createDate(){
  let date = new Date();
    return date.getDate() + "/"
                + (date.getMonth()+1)  + "/" 
                + date.getFullYear();
}
function createTime(){
    let date = new Date();
    let hours = date.getHours();
    let hoursString;
    if(hours<10)
        hoursString='0'+String(hours);
    else
        hoursString=String(hours);
    let mins = date.getMinutes();
    let minsString;
    if(mins<10)
        minsString='0'+String(mins);
    else
        minsString=String(mins);
    return hoursString+':'+minsString;
}

var announcementRouter = express.Router();

announcementRouter.use(bodyParser.json());

announcementRouter.route('/')
.get(Verify.verifyAppUser,function (req, res, next) {
    
    Announcements.find({}).sort('-createdAt').exec(function(err, announcements) { 
        if (err) throw err;
        res.json(announcements); 
    });
})

.post(Verify.verifyOrdinaryUser,function (req, res, next) {
    req.body.date = createDate();
    req.body.time = createTime();
    Announcements.create(req.body, function (err, announcement) {
        if (err) throw(err);
        console.log('Announcement created!');
        var id = announcement._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the announcement with id: ' + id);
        var group = announcement.sem + announcement.group;
        Users.find({class:group},function(err,response){
            console.log(response);
            response.forEach(function(element) {
                let token = element.token;
                unirest.post('https://fcm.googleapis.com/fcm/send')
                .headers({'Content-Type': 'application/json',
                        'Authorization': 'key=AAAAiS4AtkA:APA91bHv6islehAx0nRsakGfz8rEahTFa7DFzPVHipDAV_8__v5utSn4e3PVi2CCNph27-BEmK3Tk_uh47Etj9JF6ppXd2OKKNNIvdQgEhXBH16bk6b42-IHjn_sVlBR06lDU4k9MCe9'})
                .send({ "to":token,
                        "data": {
                        "title":"New Announcement!",
                        "body": announcement.name + ": "+ announcement.message
                        } })
                .end(function (response) {
                console.log(response.body);
                });
            }, this);
        }); 
    });
})

.delete(Verify.verifyAppUser,function (req, res, next) {
    Announcements.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

announcementRouter.route('/:announcementId')
.get(Verify.verifyAppUser, function (req, res, next) {
    var sem= req.params.announcementId[0];
    var group= req.params.announcementId.substring(1,3);
    Announcements.find({"sem":sem,"group":group}).sort('-createdAt').exec(function (err, announcement) {
        if (err) next(err);
        if(announcement=[])
            res.json([{name:"Uddish Verma",message:"Faculty messages will be posted here",
                date:createDate(),time:createTime()}]);
        else
            res.json(announcement);
        });
})

.put(Verify.verifyAppUser,function (req, res, next) {
    Announcements.findByIdAndUpdate(req.params.announcementId, {
        $set: req.body
    }, {
        new: true
    }, function (err, announcement) {
        if (err) next(err);
        res.json(announcement);
    });
})

.delete(Verify.verifyAppUser,function (req, res, next) {
        Announcements.findByIdAndRemove(req.params.announcementId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});
module.exports=announcementRouter;