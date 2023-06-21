const { Schema, model } = require("mongoose");

const artworkSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    artist: {
      //type: Artist Schema object ID?
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

const Artwork = model("Artwork", artworkSchema);

module.exports = Artwork;