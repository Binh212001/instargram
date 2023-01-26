const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  Followers: {
    type: Array,
  },
  Following: {
    type: Array,
  },

  profile: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

module.exports = mongoose.model('User', UserSchema);
