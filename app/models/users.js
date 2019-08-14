var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 255,
    required: true,
  },
  email: {
    lowercase: true,
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

var model = mongoose.model('User', schema);

module.exports = model
