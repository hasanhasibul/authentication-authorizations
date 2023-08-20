import mongoose, { Schema } from "mongoose";
import { adminInterface } from "./admin.interface";
import bcrypt from "bcrypt";
import ApiError from "../../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
const adminSchema = new Schema<adminInterface>(
  {
    address: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
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
      required: true,
      enum: ["admin"],
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.pre("save", async function (next) {
  const password = this.password;
  const hashPass = await bcrypt.hash(password, 12);
  if (!hashPass) {
    throw new ApiError(StatusCodes.FORBIDDEN, "something went wrong");
  }
  this.password = hashPass;
  next();
});
const AdminModal = mongoose.model<adminInterface>("admin", adminSchema);
export default AdminModal;
