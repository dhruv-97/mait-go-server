var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var markSchema = new Schema({
    subjectID:  {
        type: String,
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
    },
    grade:{
        type: String,
        required: true
    }
    
});
var Marks = mongoose.model('Mark', markSchema);
module.exports = Marks;