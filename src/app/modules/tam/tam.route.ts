import express from "express";
import { tamControllers } from "./tam.controllers";

const router = express.Router();

router.post("/create", tamControllers.createController);
router.get("/get", tamControllers.findController);

const tamRouter = router;

export default tamRouter;
