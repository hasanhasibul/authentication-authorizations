import mongoose, { InferSchemaType, Schema } from "mongoose";
import { userInterface } from "./user.interface";
import bcrypt from "bcrypt";
import ApiError from "../../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
const userSchema = new Schema<userInterface>(
  {
    name: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    passwordUpdatedAt: {
      type: Date,
    },
    income: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export type UserModalType = InferSchemaType<typeof userSchema>;

userSchema.pre("save", async function (next) {
  const password = this.password;
  const hashPass = await bcrypt.hash(password, 12);
  if (!hashPass) {
    throw new ApiError(StatusCodes.FORBIDDEN, "something went wrong");
  }
  this.password = hashPass;
  next();
});

const userModal = mongoose.model<userInterface>("User", userSchema);

export default userModal;
