// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var teacherSchema = new Schema({
    name:  {
        type: String,
        //required: true
    },
    designation:  {
        type: String,
        //required: true
    },
    qualification: {
        type: String,
        //required: true
    },
    exp:{
        type: String,
        //required: true
    },
    img:{
        type:String,
        //required: true
    },
    email:{
        type: String,
        //required: false
    }
    
});
// create a schema
var facultySchema = new Schema({
    IT: [teacherSchema],
    CSE: [teacherSchema],
    ECE: [teacherSchema]

});


// the schema is useless so far
// we need to create a model using it
var faculties = mongoose.model('faculty', facultySchema);

// make this available to our Node applications
module.exports = faculties;