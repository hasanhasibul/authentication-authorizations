import { RequestHandler } from "express";
import { tamServices } from "./tam.services";

const createController: RequestHandler = async (req, res, next) => {
  try {
    await tamServices.createTamServices(req);
    res.send({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
const findController: RequestHandler = async (req, res, next) => {
  try {
    const data = await tamServices.getTamServices();
    res.send({
      status: "success",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const tamControllers = {
  findController,
  createController,
};
