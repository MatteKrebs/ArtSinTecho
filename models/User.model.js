const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    favourites: {
      type: [String],
    },
    is_admin: {
      type: Boolean,
      default: false
    },
    pic: {
      type: Image,
      default: true
    }
  })

const User = mongoose.model('User', userSchema);

module.exports = User;