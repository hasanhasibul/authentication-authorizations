import { RequestHandler } from 'express'
import { userServices } from './user.services'
import { userInterface } from './user.interface'
import { StatusCodes } from 'http-status-codes'
const createUserController: RequestHandler = async (req, res, next) => {
  try {
    const reqBody: userInterface = {
      address: req?.body?.address,
      budget: req?.body?.budget,
      income: req?.body?.income,
      password: req?.body?.password,
      phoneNumber: req?.body?.phoneNumber,
      role: req?.body?.role,
      name: {
        firstName: req?.body?.name.firstName,
        lastName: req?.body?.name?.lastName,
      },
    }
    await userServices?.createUserServices(reqBody)
    res.send({
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Users created successfully',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

const getUserController: RequestHandler = async (req, res, next) => {
  try {
    const users = await userServices.getUserServices()
    res.send({
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Users retrieved successfully',
      data: users,
    })
  } catch (error) {
    next(error)
  }
}

const deleteUserController: RequestHandler = async (req, res, next) => {
  try {
    await userServices.deleteUserServices(req)
    res.send({
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Users deleted successfully',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}
const getUserByIdController: RequestHandler = async (req, res, next) => {
  try {
    const data = await userServices.getUserByIdServices(req)
    res.send({
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Users retrieved successfully',
      data: data,
    })
  } catch (error) {
    next(error)
  }
}
const UserUpdateByIdController: RequestHandler = async (req, res, next) => {
  try {
    await userServices.updateUserServices(req)
    res.send({
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Users update successfully',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createUserController,
  getUserController,
  deleteUserController,
  getUserByIdController,
  UserUpdateByIdController,
}
