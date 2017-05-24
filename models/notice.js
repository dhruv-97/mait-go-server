// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var noticeSchema = new Schema({
    notice: {
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
var notices = mongoose.model('notice', noticeSchema);

// make this available to our Node applications
module.exports = notices;