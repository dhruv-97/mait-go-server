// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var upcomingSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    organiser:{
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true

    },
    regisFee:{
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    organiserNumber: {
        type:String,
        required: true
    },
    organiserEmail:{
        type:String,
        required: true
    },
    society:{
        type:String,
        required: true
    }
}, {
    timestamps: true
});
var upcomings = mongoose.model('upcoming', upcomingSchema);

// make this available to our Node applications
module.exports = upcomings;