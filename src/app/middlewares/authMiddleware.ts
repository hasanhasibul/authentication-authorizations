import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import AdminModal from "../modules/admin/admin.modal";
import ApiError from "../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import userModal from "../modules/user/user.model";
const authMiddleware =
  (permissions: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req?.headers?.authorization || "";
      if (!token) {
        throw new ApiError(StatusCodes.FORBIDDEN, "Unathorized");
      }
      const decoded = Jwt.verify(token, "secret") as JwtPayload;
      const isUserHave = await userModal.findById({ _id: decoded?.id });
      if (!isUserHave) {
        throw new ApiError(StatusCodes.FORBIDDEN, "Unathorized");
      }
      if (!permissions.includes(decoded?.role)) {
        throw new ApiError(StatusCodes.FORBIDDEN, "access denied");
      }
      req.user = isUserHave;
      next();
    } catch (error) {
      next(error);
    }
  };

export default authMiddleware;
