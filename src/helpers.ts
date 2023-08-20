import { Request } from 'express'
import { SortOrder } from 'mongoose'

export const paginationHelper = (req: Request) => {
  const page = req.query.page || 1
  const limit = req.query.limit || 2
  const sortBy = (req.query.sortBy as string) || 'createdAt'
  const sortOrder = (req.query.sortOrder as SortOrder) || 'desc'
  const skip = (Number(page) - Number(1)) * Number(limit)
  const searchTerm = req.query.searchTerm

  return { page, limit, skip, sortBy, sortOrder, searchTerm }
}
