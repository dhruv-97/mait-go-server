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
    },
    admin: {
      type: Boolean,
      default: false
    }
});

Teacher.methods.getName = function() {
    return (this.firstname + ' ' + this.lastname);
};
Teacher.methods.setPassword = function (password, cb) {
    if (!password) {
        return cb(new BadRequestError(options.missingPasswordError));
    }

    var self = this;

    crypto.randomBytes(options.saltlen, function(err, buf) {
        if (err) {
            return cb(err);
        }

        var salt = buf.toString('hex');

        crypto.pbkdf2(password, salt, options.iterations, options.keylen, function(err, hashRaw) {
            if (err) {
                return cb(err);
            }

            self.set(options.hashField, new Buffer(hashRaw, 'binary').toString('hex'));
            self.set(options.saltField, salt);

            cb(null, self);
        });
    });
};
Teacher.plugin(passportLocalMongoose);

module.exports = mongoose.model('Teacher', Teacher);