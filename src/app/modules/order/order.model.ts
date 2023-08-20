import mongoose, { Schema, model } from 'mongoose'
import { orderInterface } from './order.interfaces'

const orderModelSchema = new Schema<orderInterface>(
  {
    buyer: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    cow: {
      type: mongoose.Types.ObjectId,
      ref: 'cows',
    },
  },
  {
    timestamps: true,
  },
)

const OrderModel = model<orderInterface>('Orders', orderModelSchema)

export default OrderModel
