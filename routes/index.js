const express = require('express');
const isLoggedin = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');

const router=express.Router();

router.get("/",function(req,res){
    res.render("index", { error: req.flash("error") });
})

router.get("/shop",isLoggedin,async function(req,res){
    const products = await productModel.find();
    res.render("shop", { 
  products, 
  error: req.flash("error") 
});
})

module.exports=router;