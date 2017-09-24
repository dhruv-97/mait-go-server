// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var updateSchema = new Schema({
    version: {
        type: String,
        required: true
    },
    updatetype:{
        type: String,
        required: true,
        enum: ["recommended","necessary"],
        default: "recommended"
    }
});
var updates = mongoose.model('update', updateSchema);

// make this available to our Node applications
module.exports = updates;