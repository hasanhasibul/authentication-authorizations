import express from "express";
import { adminController } from "./admin.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { adminZodValidationSchema } from "./admin.validations";
import authMiddleware from "../../middlewares/authMiddleware";

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(adminZodValidationSchema),
  authMiddleware(["admin", "seller"]),
  adminController.createAdminController
);
router.post("/login", adminController.adminLoginController);

const adminRouter = router;

export default adminRouter;
