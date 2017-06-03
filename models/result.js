var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var resultSchema = new Schema({
    roll:{
        type: String,
        required: true
    },
    sem:{
        type: Number,
        min:1,
        max:8
    },
    name:{
      type: String,
      required: true
    },
    college:{
      type: String,
      required: true
    },
    programme:{
      type: String,
      required: true
    },
    batch:{
      type: String,
      required: true
    },
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
    gpa:{
        type: Number,
        min: 0,
        max:10
    },
    marks:[{
        type: Schema.Types.ObjectId,
        ref: 'Mark'
    }]
    
});
var results = mongoose.model('result', resultSchema);

// make this available to our Node applications
module.exports = results;