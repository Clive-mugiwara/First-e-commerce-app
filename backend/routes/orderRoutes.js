import express from 'express'
import {placeOrder,placeOrderPaystack,allOrders,userOrders,updateStatus} from '../controllers/orderController.js'
import fetchUser from '../middleware/fetchUser.js'
import adminAuth from '../middleware/adminAuth.js'

const orderRouter = express.Router()

//Admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//payment features
orderRouter.post('/place',fetchUser,placeOrder)
orderRouter.post('/paystack',fetchUser,placeOrderPaystack)

//user feature
orderRouter.post('/userorders',fetchUser,userOrders)


export default orderRouter