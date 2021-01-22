import { Document, Model, model, Schema } from "mongoose";
import validator from "validator";

import { hashPassword } from "@root/helpers/authHelpers";

interface IUser extends Document {
  email: string;
  password: string;
  active: boolean;
  createdAt: Date;
  deletedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    deletedAt: {
      type: Date,
      select: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
  next();
});

// userSchema.pre(/^find/, function (next) {
//   // This points to current query
//   // this.find({ active: { $ne: false } });
//   next();
// });

const User: Model<IUser> = model("User", userSchema);

export default User;
