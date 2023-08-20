import { RequestHandler } from 'express'
import { orderServices } from './order.services'
import { StatusCodes } from 'http-status-codes'

const createOrderController: RequestHandler = async (req, res, next) => {
  try {
    await orderServices.createOrderService(req)
    res.send({
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Cow created successfully',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

const getAllOrderController: RequestHandler = async (req, res, next) => {
  try {
    const orders = await orderServices.getAllOrderService()
    res.send({
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Cows Retrived successfully',
      data: orders,
    })
  } catch (error) {
    next(error)
  }
}

export const orderControllers = {
  createOrderController,
  getAllOrderController,
}
