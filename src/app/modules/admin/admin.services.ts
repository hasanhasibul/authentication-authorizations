import { NextFunction, Request } from "express";
import AdminModal from "./admin.modal";
import ApiError from "../../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createAdminService = async (req: Request) => {
  const admin = await AdminModal.create(req.body);
  if (!admin) {
    throw new ApiError(StatusCodes.FORBIDDEN, "fail to create admin");
  }

  return admin;
};

const loginAdminService = async (req: Request) => {
  const rawPassword = req?.body?.password;
  const admin = await AdminModal.findOne({
    phoneNumber: req?.body?.phoneNumber,
  });
  if (!admin) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "user not exist");
  }
  const data = {
    role: admin?.role,
    id: admin?._id,
  };
  const hashPassword = admin?.password || "";

  const isPasswordMatch = await bcrypt.compare(rawPassword, hashPassword);

  if (!isPasswordMatch) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "password  not match");
  }
  const accessToken = jwt.sign(data, "secret", { expiresIn: "1h" });
  const refreshToken = jwt.sign(data, "secret", { expiresIn: "48h" });
  return {
    accessToken,
    refreshToken,
  };
};

export const adminServices = {
  createAdminService,
  loginAdminService,
};
