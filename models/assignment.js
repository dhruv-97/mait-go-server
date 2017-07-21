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
        type: Date,
        required: true
    },
    files:{
        type:[String],
        required: true
    },
    createdAt: {
        type: String,
        required: true
    }
});
var assignments = mongoose.model('assignment', assignmentSchema);

// make this available to our Node applications
module.exports = assignments;