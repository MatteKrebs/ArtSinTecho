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
        type: Image,
        //  define the default pic with logo
        default: 'https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg',
    },
    links: {
        type: String,
        required: false,
    },

    works: {
      
        type: [String],
        required: true
    }
  },
  {
    timestamps: true
  }
);


const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;




// try again