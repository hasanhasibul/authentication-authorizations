import { Request } from 'express'
import { userInterface } from './user.interface'
import userModal from './user.model'

const createUserServices = async (reqBody: userInterface) => {
  const user = await userModal.create(reqBody)
  if (!user) {
    throw new Error('user creation fail')
  }
  return user
}

const updateUserServices = async (req: Request) => {
  const id = req.params.id
  const user = await userModal.findByIdAndUpdate(id, req.body)
  if (!user) {
    throw new Error('user updated fail')
  }
  return user
}
const getUserServices = async () => {
  const user = await userModal.find({})
  if (!user) {
    throw new Error('user retrieved fail')
  }
  return user
}
const deleteUserServices = async (req: Request) => {
  const id = req.params.id
  const user = await userModal.findByIdAndDelete({ _id: id })
  if (!user) {
    throw new Error('user deleted fail')
  }
  return user
}
const getUserByIdServices = async (req: Request) => {
  const id = req.params.id
  const user = await userModal.findById({ _id: id })
  if (!user) {
    throw new Error('user find  fail')
  }
  return user
}
export const userServices = {
  createUserServices,
  getUserServices,
  deleteUserServices,
  getUserByIdServices,
  updateUserServices,
}
