import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';

//Placing orders using Cash on delivery

const placeOrder = async (req,res) => {

    try {
        const userId = req.user.id;
        const {items,amount,address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const emptyCart = {};
        for (let i = 0; i < 300; i++) {
          emptyCart[i] = 0;
        }

        await userModel.findByIdAndUpdate(
          userId,
          { cartData: emptyCart },
          { new: true },
        );
        

        // await userModel.findByIdAndUpdate(userId,{cardData:{}});

        res.json({success:true,message:"Order Placed"})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }

}


//Placing orders using Paystack

const placeOrderPaystack = async (req,res) => {

}

// All orders data for Admin panel
const allOrders = async (req,res) => {

}



// All orders data for frontend
const userOrders = async (req,res) => {
    try {
        
        const userId = req.user.id;

        const orders = await orderModel.find({ userId })
        res.json({success:true,orders})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }

}


//update order status from Admin
const updateStatus = async (req,res) => {

}


export {placeOrder,placeOrderPaystack,allOrders,userOrders,updateStatus}