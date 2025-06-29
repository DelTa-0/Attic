const express = require('express');
const isLoggedin = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

const router=express.Router();

router.get("/",function(req,res){
    let error=req.flash("error");
    res.render("index",{error,loggedin:false})
})

router.get("/shop",isLoggedin,async function(req,res){
    const products = await productModel.find();
    let success=req.flash("success");
    res.render("shop", { 
  products,
  success, 
  error: req.flash("error") 
});
})

router.get("/cart",isLoggedin,async function(req,res){
    let user=await userModel.findOne({email:req.user.email})
    .populate("cart");
    let totalbill = 0;
    user.cart.forEach(function(item){
      const itemTotal = Number(item.price) + 20 - Number(item.discount);
      totalbill += itemTotal;
    })
    
    res.render("cart", {user,totalbill});
})

router.get("/addtocart/:productid",isLoggedin,async function(req,res){
    let user=await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","added to cart");
    res.redirect("/shop");
})


module.exports=router;