const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  bloodGroup: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);
