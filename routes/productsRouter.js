const express = require('express');
const router=express.Router();
const ownerModel = require('../models/owner-model');
const productModel = require('../models/product-model');
const upload = require('../config/multer-config');

// if(process.env.NODE_ENV==="development"){
//    router.post('/create',async function(req,res){
//     let owners=await ownerModel.find();
//     if(owners.length>0){
//     return res.send(503).send("you dont have permission");}
    
//     let {image,name,price,discount,bgcolor,panelcolor,textcolor}=req.body;
//     let createdProduct=await productModel.create({
//     image,
//     name,
//     price,
//     discount,
//     bgcolor,
//     panelcolor,
//     textcolor
//     });
//     res.status(201).send(createdProduct);
// })
    
// }
router.post('/create',upload.single("image"),async function(req,res){
    try{
        let {name,price,discount,bgcolor,panelcolor,textcolor}=req.body;
    let product=await productModel.create({
        image:req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
    });
    req.flash("success","product created successfully");
    res.redirect("/owners/admin");
    }catch(err){
        res.send(err.message);
    }
})

module.exports=router;