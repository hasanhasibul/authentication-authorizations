import express from 'express'
import { orderControllers } from './order.controllers'

const router = express.Router()

router.post('/orders', orderControllers.createOrderController)
router.get('/orders', orderControllers.getAllOrderController)

const orderRoutes = router

export default orderRoutes
