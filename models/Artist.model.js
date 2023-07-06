const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({

    name: {
      type: String,
      required: true
    },
    city: {
        type: String,
        required: true
    },
    artType: {
      type: String,
    },
    description: {
      type: String,
    },
    pic: {
        type: String,
        //  define the default pic with logo
        default: './images/vecteezy_user-profile-icon-profile-avatar-user-icon-male-icon_20911750_60.png',
    },
    works:
      {type: [Schema.Types.ObjectId], ref: 'Artwork'}
  ,
  {
    timestamps: true
  }
);


const Artist = mongoose.model('Artist', artistSchema);


module.exports = Artist;

