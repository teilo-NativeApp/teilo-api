// IMPORTS ------------------------------------------
import mongoose from "mongoose";
// --------------------------------------------------

const { Schema, model } = mongoose;

// SCHEMA -------------------------------------------
const GroupSchema = new Schema(
  {
    groupName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    users: [
      { type: Schema.Types.ObjectId, ref: "User", required: false },
      { _id: false },
    ],
    tasks: [
      { type: Schema.Types.ObjectId, ref: "Task", required: false },
      { _id: false },
    ],
    events: [
      { type: Schema.Types.ObjectId, ref: "Event", required: false },
      { _id: false },
    ],
    expenses: [
      {
        expenseName: { type: String, required: true },
        totalCost: { type: Number, required: true },
        date: { type: Date, required: true },
        settled: { type: Boolean, default: false },
        whoPaid: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        assignedUsers: [
          {
            type: Schema.Types.ObjectId,
            ref: "User",
            paid: {
              type: Boolean,
              default: false
            }
          },
          { _id: false },
        ],
      },
    ],
    totalSpent: {
      type: Number,
      default: 0
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
// --------------------------------------------------

// MODEL --------------------------------------------
const Group = model("Group", GroupSchema);

export default Group;
