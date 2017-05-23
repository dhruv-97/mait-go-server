var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var markSchema = new Schema({
    subjectID:  {
        type: Number,
        required: true
    },
    subjectCode:  {
        type: String,
        required: true
    },
    subjectName: {
        type: String,
        required: true
    },
    internal: {
        type: Number,
        max: 40,
        min:0,
        required: true

    },
    external: {
        type: Number,
        min:0,
        max:75,
        required: true
    },
    total: {
        type: Number,
        min: 0,
        max: 100,
        required: true

    },
    credits:{
        type: Number,
        required: true
    }
    
});
var resultSchema = new Schema({
    percentage: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    creditp: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    marks: [markSchema]
    
});
var results = mongoose.model('result', resultSchema);

// make this available to our Node applications
module.exports = results;