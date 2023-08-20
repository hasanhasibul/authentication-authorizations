import Jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import AdminModal from "../admin/admin.modal";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModal from "../user/user.model";
import { Request, RequestHandler } from "express";

const getRefreshTokenServices = async (refreshToken: string) => {
  let isValidToken: JwtPayload | null | string = null;
  try {
    isValidToken = Jwt.verify(refreshToken, "secret");
  } catch (error) {
    throw new ApiError(StatusCodes.FORBIDDEN, "unthorized");
  }

  const { id, role } = isValidToken as JwtPayload;

  const isUserExit = await userModal.findById(id);
  if (!isUserExit) {
    throw new ApiError(StatusCodes.FORBIDDEN, "unthorized user not found");
  }

  //generate new access token

  const newAccesstoken = Jwt.sign({ id: id, role: role }, "secret", {
    expiresIn: "1h",
  });

  return {
    accessToken: newAccesstoken,
  };
};

const loginUserService = async (req: Request) => {
  const rawPassword = req?.body?.password;
  const user = await userModal.findOne({
    phoneNumber: req?.body?.phoneNumber,
  });
  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "user not exist");
  }
  const data = {
    role: user?.role,
    id: user?._id,
  };
  const hashPassword = user?.password || "";

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

const updatePasswordService = async (req: Request) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  // check user is exit or not
  const isUserExit = await userModal.findOne({ _id: req.user?.id });
  if (!isUserExit) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "user not exist");
  }

  // check old password is correct or not

  const isPasswordMatch = await bcrypt.compare(
    oldPassword,
    isUserExit.password
  );
  if (!isPasswordMatch) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Old password  not match");
  }
  // if old password is correct then hash the new password

  const newHashPass = await bcrypt.hash(newPassword, 12);

  // finally update the password

  await userModal.findOneAndUpdate(
    { _id: req.user?.id },
    { password: newHashPass, passwordUpdatedAt: new Date() }
  );
};

export const authServices = {
  getRefreshTokenServices,
  loginUserService,
  updatePasswordService,
};
