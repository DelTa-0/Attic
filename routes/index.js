const express = require('express');
const isLoggedin = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');

const router=express.Router();

router.get("/",function(req,res){
    let error=req.flash("error");
    res.render("index",{error,loggedin:false})
})

router.get("/shop",isLoggedin,async function(req,res){
    const products = await productModel.find();
    res.render("shop", { 
  products, 
  error: req.flash("error") 
});
})

module.exports=router;