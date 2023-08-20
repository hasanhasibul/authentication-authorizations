import mongoose, { InferSchemaType, Schema } from 'mongoose'
import { enumCategoris, enumLocations } from './cow.constant'
import { cowSchemaInterface } from './cow.interface'

const cowSchema = new Schema<cowSchemaInterface>(
  {
    age: {
      type: Number,
      required: true,
    },
    breed: {
      type: String,
      enum: [
        'Brahman',
        'Nellore',
        'Sahiwal',
        'Gir',
        'Indigenous',
        'Tharparkar',
        'Kankrej',
      ],
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [...enumCategoris],
    },
    label: {
      type: String,
      required: true,
      enum: ['for sale', 'sold out'],
    },
    location: {
      type: String,
      required: true,
      enum: [...enumLocations],
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    seller: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)
export type cowModalType = InferSchemaType<typeof cowSchema>

const cowModel = mongoose.model<cowSchemaInterface>('cows', cowSchema)

export default cowModel
