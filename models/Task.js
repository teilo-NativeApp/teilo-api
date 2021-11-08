// IMPORTS ------------------------------------------
import mongoose from "mongoose";
// --------------------------------------------------

const { Schema, model } = mongoose;

// SCHEMA -------------------------------------------
const TaskSchema = new Schema(
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
      required: false, // need to change to 'true' after finishing practicing
    },
    completed: {
      type: Boolean,
      default: false,
    },
    recurring: {
      type: Boolean,
      interval: Number,
      default: false,
    },
    date: {
      type: Date,
      required: true,
    },
    assignedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
      { _id: false },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
// --------------------------------------------------

// MODEL --------------------------------------------
const Task = model("Task", TaskSchema);

export default Task;
