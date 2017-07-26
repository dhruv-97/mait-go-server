var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Teacher = new Schema({
    username: String,
    password: String,
    firstname: {
      type: String,
      default: ''
    },
    lastname: {
      type: String,
      default: ''
    }
});

Teacher.methods.getName = function() {
    return (this.firstname + ' ' + this.lastname);
};
Teacher.plugin(passportLocalMongoose);

module.exports = mongoose.model('Teacher', Teacher);