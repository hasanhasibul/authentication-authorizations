/* eslint-disable no-unused-expressions */
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import { userRouter } from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { cowRouter } from "./app/modules/cow/cow.route";
import orderRoutes from "./app/modules/order/order.route";
import adminRouter from "./app/modules/admin/admin.route";
import cookieParser from "cookie-parser";
import tamRouter from "./app/modules/tam/tam.route";
import authRouter from "./app/modules/auth/auth.route";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/cow", cowRouter);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/tam", tamRouter);
app.use("/api/v1/auth", authRouter);

app.get("/api/v1", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use((req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    data: {},
    message: "404 not found",
  });
});
app.use(globalErrorHandler);

export default app;
