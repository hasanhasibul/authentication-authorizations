import { RequestHandler } from "express";
import { adminServices } from "./admin.services";

const createAdminController: RequestHandler = async (req, res, next) => {
  try {
    await adminServices.createAdminService(req);
    res.send({
      success: true,
      statusCode: 200,
      message: "Admin created successfully",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

const adminLoginController: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken, ...others } = await adminServices.loginAdminService(
      req
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: false,
      secure: false,
    });
    res.send({
      success: true,
      statusCode: 200,
      message: "Admin login successfully",
      data: others,
    });
  } catch (error) {
    next(error);
  }
};

export const adminController = {
  createAdminController,
  adminLoginController,
};
