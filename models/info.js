var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var infoSchema = new Schema({
    roll:{
      type: String,
      required: true
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
      required: true
    }
});
var infos = mongoose.model('info', infoSchema);

// make this available to our Node applications
module.exports = infos;