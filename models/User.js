// IMPORTS ------------------------------------------
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
// --------------------------------------------------

const { Schema, model } = mongoose;

// SCHEMA -------------------------------------------
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    income: {
      type: Number,
      required: false
    },
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
        required: false
      },
      { _id: false }
    ],
    // tasks: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Task",
    //     required: false
    //   },
    //   { _id: false }
    // ],
    // events: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Event",
    //     required: false
    //   },
    //   { _id: false }
    // ],
}, {
    versionKey: false,
    timestamps: true
});
// --------------------------------------------------


// HASHING ------------------------------------------
UserSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    user.password = bcrypt.hashSync(user.password, 10);
    next();
});
// --------------------------------------------------


// MODEL --------------------------------------------
const User = model("User", UserSchema);

export default User;