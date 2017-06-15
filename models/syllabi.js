// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var syllabiSchema = new Schema({
    year: {
        type: Number,
        required: true,
        min:1,
        max:4
    },
    sem:{
        type: Number,
        required: true,
        min: 1,
        max: 8
    },
    paperCode:{
      type: String,
      required:true
    },
    paperName: {
      type: String,
      required: true
    },
    programme: {
        type: String,
        required: true

    },
    unit1:{
        type: String,
        required: true
    },
    unit2: {
        type: String,
        required: false
    },
    unit3: {
        type: String,
        required: true
    },
    unit4:{
        type: String,
        required: true
    }
});
var Syllabus = mongoose.model('Syllabi', syllabiSchema);

// make this available to our Node applications
module.exports = Syllabus;