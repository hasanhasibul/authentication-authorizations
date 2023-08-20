import express from "express";
import { cowControllers } from "./cow.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { createCowZodSchema, updateCowZodSchema } from "./cow.validations";
import authMiddleware from "../../middlewares/authMiddleware";

const router = express.Router();

router.post(
  "/create-cows",
  validateRequest(createCowZodSchema),
  authMiddleware(["seller"]),
  cowControllers.createCowController
);

router.patch(
  "/cows/:id",
  validateRequest(updateCowZodSchema),
  authMiddleware(["seller"]),
  cowControllers.updateCowsController
);

router.get(
  "/cows",
  authMiddleware(["seller", "buyer", "admin"]),
  cowControllers.getAllCowsController
);
router.get(
  "/cows/:id",
  authMiddleware(["seller", "buyer", "admin"]),
  cowControllers.getSignleCowsController
);
router.delete(
  "/cows/:id",
  authMiddleware(["seller"]),
  cowControllers.deleteCowsController
);
export const cowRouter = router;
