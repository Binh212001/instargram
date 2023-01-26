const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },
    video: {
      type: String,
    },
    like: Array,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Post', postSchema);
