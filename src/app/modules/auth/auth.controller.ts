import { RequestHandler } from "express";
import { authServices } from "./auth.services";
import { userServices } from "../user/user.services";
import { StatusCodes } from "http-status-codes";

const refreshTokenController: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const data = await authServices.getRefreshTokenServices(refreshToken);
    res.send({
      success: true,
      statusCode: 200,
      message: "New access token generated successfully !",
      data: {
        accessToken: data?.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const userLoginController: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken, ...others } = await authServices.loginUserService(
      req
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: false,
      secure: false,
    });
    res.send({
      success: true,
      statusCode: 200,
      message: "user login successfully",
      data: others,
    });
  } catch (error) {
    next(error);
  }
};

const updatePasswordController: RequestHandler = async (req, res, next) => {
  try {
    await authServices.updatePasswordService(req);

    res.send({
      status: StatusCodes.OK,
      message: "Password updated succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export const authControllrs = {
  refreshTokenController,
  userLoginController,
  updatePasswordController,
};
