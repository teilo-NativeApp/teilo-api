// IMPORTS ------------------------------------------
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// --------------------------------------------------

const { Schema, model } = mongoose;

// SCHEMA -------------------------------------------
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    income: {
      type: Number,
      required: false,
    },
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
        required: false,
      },
      { _id: false },
    ],
    balanceOverall: {
      type: Number,
      required: false
    },
    balanceToUser: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
      },
        amount: {
          type: Number,
          required: false
      },
      //   settled: {
      //     type: Boolean,
      //     default: false
      // }
    },
      { _id: false }
    ]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
// --------------------------------------------------

// HASHING ------------------------------------------
UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.password = bcrypt.hashSync(user.password, 10);
  next();
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  if (!this._update.password) return next();
  this._update.password = await bcrypt.hash(this._update.password, 10);
  next();
});
// --------------------------------------------------

// METHODS ------------------------------------------
dotenv.config();

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  console.log(`We created a token for user ${user._id} --> ${token}`);
  return token;
};
// --------------------------------------------------


// STATICS ------------------------------------------
UserSchema.statics.verifyToken = function (token) {
  return jwt.verify(token, process.env.JWT_KEY);
};

UserSchema.statics.findByToken = function (token) {
  const User = this;
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_KEY);
  } catch (error) {
    return;
  };

  return User.findById(payload._id);
};
// --------------------------------------------------

// MODEL --------------------------------------------
const User = model("User", UserSchema);

export default User;
