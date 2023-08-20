import express from "express";
import { userController } from "./user.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { UserUpdateZodSchema, UserZodSchema } from "./user.validations";
import authMiddleware from "../../middlewares/authMiddleware";
import { authTokeZodSchema } from "../auth/auth.validations";

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(UserZodSchema),
  userController.createUserController
);
router.get(
  "/users",
  authMiddleware(["admin"]),
  userController.getUserController
);
router.delete(
  "/users/:id",
  authMiddleware(["admin"]),
  userController.deleteUserController
);
router.get(
  "/users/:id",
  authMiddleware(["admin"]),
  userController.getUserByIdController
);
router.patch(
  "/users/:id",
  validateRequest(UserUpdateZodSchema),
  authMiddleware(["admin"]),
  userController.UserUpdateByIdController
);

export const userRouter = router;
