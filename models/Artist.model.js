const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({

    name: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    artType: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true
    },
    pic: {
        type: String,
        //  define the default pic with logo
        default: './images/vecteezy_user-profile-icon-profile-avatar-user-icon-male-icon_20911750_60.png',
    },
    links: {
        type: String,
        required: false,
    },

    works: {
      
        type: [String],
        required: false
    }
  },
  {
    timestamps: true
  }
);


const Artist = mongoose.model('Artist', artistSchema);


module.exports = Artist;

