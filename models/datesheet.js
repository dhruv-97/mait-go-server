// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var datesheetSchema = new Schema({
    datesheet: {
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});
var datesheets = mongoose.model('datesheet', datesheetSchema);

// make this available to our Node applications
module.exports = datesheets;