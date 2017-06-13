var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    _id: {
        type: String
    },
    name:{
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    deviceID: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('User', User);