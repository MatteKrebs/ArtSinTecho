const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const artworkSchema = new Schema({
    imageURL: {
      type: Image,
      required: true,
      default: './images/vecteezy_torn-note-paper-background-for-element-design_13443011_684.png'
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    artist: {
      type: [{type: Schema.Types.ObjectId, ref: 'Artist'}],
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    story: {
      type: String,
      required: false,
    },
    mood: {
        type: [String],
        required: false,
        lowercase: true,
      },  
    dateOfCompletion: {
      type: Date,
      required: false
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Artwork = mongoose.model("Artwork", artworkSchema);

module.exports = Artwork;