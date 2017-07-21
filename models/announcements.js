// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var announcementSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sem:{
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true

    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    }
});
var Announcements = mongoose.model('announcement', announcementSchema);

// make this available to our Node applications
module.exports = Announcements;