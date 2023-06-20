const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
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
    }
  },
  {   
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
