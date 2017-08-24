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
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
var Announcements = mongoose.model('announcement', announcementSchema);

// make this available to our Node applications
module.exports = Announcements;