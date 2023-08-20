import { Request } from 'express'
import OrderModel from './order.model'
import cowModel from '../cow/cow.modal'
import userModal from '../user/user.model'
import mongoose from 'mongoose'

const createOrderService = async (req: Request) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const cowDetails = await cowModel
      .findById(req?.body?.cow)
      .populate('seller')

    if (!cowDetails) {
      throw new Error('cowDetails Not Found')
    }
    const userDetails = await userModal.findById(req?.body?.buyer)

    if (!userDetails) {
      throw new Error('userDetails Not Found')
    }

    const cowPrice = cowDetails?.price || 0
    const sellerCorrentIncome = cowDetails?.seller?.income || 0
    const budget = userDetails?.budget || 0

    const remainingBuyedBudget = budget - cowPrice
    const selletIncome = sellerCorrentIncome + cowPrice
    const sellerId = cowDetails?.seller?._id

    const userResponseSeller = await userModal.findByIdAndUpdate(sellerId, {
      income: selletIncome,
    })
    if (!userResponseSeller) {
      throw new Error('seller income updated fail')
    }
    const userResponse = await userModal.findByIdAndUpdate(req?.body?.buyer, {
      budget: remainingBuyedBudget,
    })
    if (!userResponse) {
      throw new Error('buyer budget updated fail')
    }

    const order = await OrderModel.create(req.body)
    if (!order) {
      throw new Error('order creation fail')
    }

    session.commitTransaction()
    session.endSession()
    return order
  } catch (error) {
    session.abortTransaction()
    throw error
  }
}

const getAllOrderService = async () => {
  const orders = await OrderModel.find({}).populate('buyer').populate('cow')
  if (!orders) {
    throw new Error('order retrived fail')
  }
  return orders
}

export const orderServices = {
  createOrderService,
  getAllOrderService,
}
