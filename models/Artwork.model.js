const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const artworkSchema = new Schema({
    imageURL: {
      type: String,
      required: false,
      // default: './images/vecteezy_torn-note-paper-background-for-element-design_13443011_684.png'
    },
    title: {
      type: String,
      required: true,
      default: 'Untitled'
    },
    artist: 
      {type: Schema.Types.ObjectId, ref: 'Artist'}
    ,
    story: {
      type: String
    },
    mood: {
        type: [String]
      },  
    dateOfCompletion: {
      type: Date
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Artwork = mongoose.model("Artwork", artworkSchema);

module.exports = Artwork;