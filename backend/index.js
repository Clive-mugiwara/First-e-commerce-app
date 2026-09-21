// const port = 4000;
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");
// const cors = require("cors");
// const crypto = require('crypto');

// const dns = require('dns');
// const { type } = require("os");
// const { log } = require("console");

const port = 4000;
import express from "express";
const app = express();
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import cors from "cors";
import crypto from 'crypto';

import dns from 'dns';
import { type } from "os";
import { log } from "console";

dns.setServers(['8.8.8.8', '1.1.1.1']);

// require('dotenv').config();
import 'dotenv/config';

app.use(express.json());
app.use(cors());

// Database connection with mongodb
mongoose.connect('mongodb://daeclive_db_user:iqc4yBOGlNjJe2AS@ac-nf7ud8g-shard-00-00.ijbbjwn.mongodb.net:27017,ac-nf7ud8g-shard-00-01.ijbbjwn.mongodb.net:27017,ac-nf7ud8g-shard-00-02.ijbbjwn.mongodb.net:27017/?ssl=true&replicaSet=atlas-s2qsxn-shard-0&authSource=admin&appName=Cluster0');
// 'mongodb+srv://daeclive_db_user:iqc4yBOGlNjJe2AS@cluster0.ijbbjwn.mongodb.net/?appName=Cluster0'
// 'mongodb+srv://daeclive_db_user:iqc4yBOGlNjJe2AS@cluster0.ijbbjwn.mongodb.net/';

//API creation

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

// Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})


//creating upload endpoint for images

app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//schema for creating products

const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    },
})


//creating api for getting all products

app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log('All Products Fetched');
    res.send(products);
})


//creating schema for user model

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//creating endpoint for registering the user
app.post('/signup',async(req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if (check) {
        return res.status(400).json({success:false,errors:"Existing user found with the same email address"})
    }
    let cart = {};
    for (let i=0; i < 300; i++) {
        cart[i]=0;
    }

    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})

})

//creating endpoint for user login
app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,errors:"Enter correct email address"})
    }
})


// creating endpoint for new collection data
app.get('/newcollections',async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-4);
    console.log("NewCollection Fetched");
    res.send(newcollection);
    
})


//creating middleware to fetch user
const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({errors:'Please authenticate using valid token'})
    }
    else{
        try{
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:'Please authenticate using a valid token'})
        }
    }
}



// creating endpoint for popular stock section
app.get('/popularstock',async (req,res)=>{
    let products = await Product.find({category:'Bracelets'});
    let popularstock = products.slice(0,4);
    console.log("Popular Stock Fetched");
    res.send(popularstock);
})

//creating endpoint for adding cart data
app.post('/addtocart',fetchUser,async (req,res)=>{
    console.log("added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})


//creating endpoint to remove product from cartdata
app.post('/removefromcart',fetchUser,async (req,res)=>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})


//creating endpoint to get cartdata
app.post('/getcart',fetchUser,async (req,res)=>{
    console.log('Get Cart');
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

//endpoint for admin login

// app.post('/adminLogin',async (req,res) => {
//     try {
//         const {email,password} = req.body

//         if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//             const token = jwt.sign(email+password,process.env.JWT_SECRET);
//             res.json({success:true,token})
//         } else {
//             res.json({success:false,message:"Invalid Credentials"})
//         } 
//     }catch (error) {
//         console.log(error);
//         res.json({success:false,message: "Something went wrong"})
//     }
// })

//endpoint for admin login
app.post('/admin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const emailMatch = timingSafeEqual(email, process.env.ADMIN_EMAIL);
        const passwordMatch = timingSafeEqual(password, process.env.ADMIN_PASSWORD);

        if (emailMatch && passwordMatch) {
            const token = jwt.sign(
                { email, role: 'admin' },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            return res.json({ success: true, token });
        }
        return res.json({ success: false, message: "Invalid Credentials" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Something went wrong" });
    }
});

function timingSafeEqual(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string') return false;
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
}


const adminAuth = async (req,res,next) => {
    try {
        const {token} = req.headers
        if (!token) {
            return res.json({success:false,message:"Not Authorized. Login to Proceed"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log(token_decode);        
        if (token_decode.role !== 'admin' || token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: "Not Authorized Login Again" });
        }
        next()
    } catch (error) {
       console.log(error);
       res.json({success:false,message: "Something went wrong"})
        
    }
}

// export default adminAuth




//api for adding product
app.post('/addproduct',adminAuth,async (req,res) =>{
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1
    }
    else{
        id = 1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved")
    res.json({
        success:true,
        name:req.body.name,
    })
})


// api for removing products

app.post('/removeproduct',adminAuth,async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})


app.listen(port,(error)=>{
    if (!error) {
        console.log("Server running on port "+port)
    }
    else
    {
        console.log("Error : "+error)
    }
})
