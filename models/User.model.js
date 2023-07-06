const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    city: {
      type: String,
      required: false,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    userPicture: {
      type: String,
      default: "public/images/vecteezy_user-profile-icon-profile-avatar-user-icon-male-icon_20911750_60.png"
    }
  })

const User = mongoose.model('User', userSchema);

module.exports = User;