// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
var periodSchema = new Schema({
    subject:  {
        type: String,
        required: false,
        default:'121'
    },
    room:  {
        type: String,
        required: false,
        default:'121'
    },
    teacher: {
        type: String,
        required: false,
        default:'121'
    }
    
});
// create a schema
var daySchema = new Schema({
    p1: [periodSchema],
    p2: [periodSchema],
    p3: [periodSchema],
    p4: [periodSchema],
    p5: [periodSchema],
    p6: [periodSchema],
    p7: [periodSchema]
});
var timeSchema = new Schema({
    sem: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    monday: [daySchema],
    tuesday: [daySchema],
    wednesday: [daySchema],
    thursday: [daySchema],
    friday: [daySchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var TimeTables = mongoose.model('TimeTable', timeSchema);

// make this available to our Node applications
module.exports = TimeTables;