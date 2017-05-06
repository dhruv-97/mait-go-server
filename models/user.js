var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MaitUser = new Schema({
    roll: {
        type: String,
        unique: true,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    sem: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    }
});
MaitUser.methods.getCode = function() {
    return (this.sem +this.group);
};
module.exports = mongoose.model('MaitUser', MaitUser);