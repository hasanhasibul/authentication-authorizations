import express from "express";
import { authControllrs } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updatePasswordZodSchema, useLoginZodSchema } from "./auth.validations";
import authMiddleware from "../../middlewares/authMiddleware";

const router = express.Router();

router.post("/refress-token", authControllrs.refreshTokenController);
router.post(
  "/login",
  validateRequest(useLoginZodSchema),
  authControllrs.userLoginController
);
router.post(
  "/change-password",
  validateRequest(updatePasswordZodSchema),
  authMiddleware(["admin", "seller", "buyer"]),
  authControllrs.updatePasswordController
);

const authRouter = router;

export default authRouter;
