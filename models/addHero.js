var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var heroSchema = new Schema({
  alias: String,
  name: String,
  surname: String,
  city: String,
  power: String
});

var heroToDB =mongoose.model('Heroes', heroSchema);
module.exports= heroToDB;
