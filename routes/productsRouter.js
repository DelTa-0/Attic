const express = require('express');
const router=express.Router();
const ownerModel = require('../models/owner-model');
const productModel = require('../models/product-model');
if(process.env.NODE_ENV==="development"){
   router.post('/create',async function(req,res){
    let owners=await ownerModel.find();
    if(owners.length>0){
    return res.send(503).send("you dont have permission");}
    
    let {image,name,price}=req.body;
    let createdProduct=await productModel.create({
    image,
    name,
    price,
    });
    res.status(201).send(createdProduct);
})
    
}
router.get('/',function(req,res){
    res.send("hey");
})

module.exports=router;