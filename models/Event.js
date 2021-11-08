// IMPORTS ------------------------------------------
import mongoose from "mongoose";
// --------------------------------------------------

const { Schema, model } = mongoose;

// SCHEMA -------------------------------------------
const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    creatorID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    groupID: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: false, // change to 'true' when done practicing
    },
    date: {
      type: Date,
      required: true,
    },
    // recurring: {
    //   type: Boolean,
    //   interval: Number,
    //   default: false
    // },
    // participants: [ // is this really needed? A user might only be adding events that are relative to all members of the group, or might the user want to use this for events only pertaining to the individual?
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: false
    //   },
    //   { _id: false }
    // ]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
// --------------------------------------------------

// MODEL --------------------------------------------
const Event = model("Event", EventSchema);

export default Event;
