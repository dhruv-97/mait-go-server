var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    _id: {
        type: String
    },
    class: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('User', User);