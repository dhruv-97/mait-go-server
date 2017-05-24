var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var infoSchema = new Schema({
    _id:{
      type: String
    },
    name:{
      type: String,
      required: true
    },
    college:{
      type: String,
      required: true
    },
    stream:{
      type: String,
      required: true
    },
    result: {
      type: Schema.Types.ObjectId,
      ref: 'result',
      required: true
    }
});
infoSchema.pre('remove', function(next) {
    this.model('result').remove({ _id: this.result }).exec();
    next();
});
var infos = mongoose.model('info', infoSchema);

// make this available to our Node applications
module.exports = infos;