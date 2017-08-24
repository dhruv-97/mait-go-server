// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var assignmentSchema = new Schema({
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
    subject:{
        type: String,
        required: true
    },
    marks: {
        type: String,
        required: false
    },
    last: {
        type: String,
        required: true
    },
    files:{
        type:[String],
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    teacher: {
        type: String
    }
    
}, {
    timestamps: true
});
var assignments = mongoose.model('assignment', assignmentSchema);

// make this available to our Node applications
module.exports = assignments;