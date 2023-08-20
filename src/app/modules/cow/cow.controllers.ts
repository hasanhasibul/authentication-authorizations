import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { cowServices } from './cow.services'

const createCowController: RequestHandler = async (req, res, next) => {
  try {
    await cowServices.createCowServices(req)
    res.send({
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'cow created successfully',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

const getAllCowsController: RequestHandler = async (req, res, next) => {
  try {
    const cows = await cowServices.getAllCowServices(req)
    res.send({
      success: true,
      statusCode: StatusCodes.OK,
      message: 'cows retrived successfully',
      meta: cows.meta,
      data: cows?.response,
    })
  } catch (error) {
    next(error)
  }
}
const getSignleCowsController: RequestHandler = async (req, res, next) => {
  try {
    const cow = await cowServices.getSingleCowServices(req)
    res.send({
      success: true,
      statusCode: StatusCodes.OK,
      message: 'cows retrived successfully',
      data: cow,
    })
  } catch (error) {
    next(error)
  }
}

const updateCowsController: RequestHandler = async (req, res, next) => {
  try {
    await cowServices.updateCowServices(req)
    res.send({
      success: true,
      statusCode: StatusCodes.OK,
      message: 'cows updated successfully',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

const deleteCowsController: RequestHandler = async (req, res, next) => {
  try {
    await cowServices.deleteCowServices(req)
    res.send({
      success: true,
      statusCode: StatusCodes.OK,
      message: 'cows deleted successfully',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

export const cowControllers = {
  createCowController,
  getAllCowsController,
  getSignleCowsController,
  deleteCowsController,
  updateCowsController,
}
