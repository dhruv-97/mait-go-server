// grab the things we need
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
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
    file: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
assignmentSchema.plugin(autoIncrement.plugin, 'assignment');
var assignments = mongoose.model('assignment', assignmentSchema);

// make this available to our Node applications
module.exports = assignments;