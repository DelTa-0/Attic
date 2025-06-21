const express = require('express');
const isLoggedin = require('../middlewares/isLoggedIn');

const router=express.Router();

router.get("/",function(req,res){
    res.render("index", { error: req.flash("error") });
})

router.get("/shop",isLoggedin,function(req,res){
    res.render("shop", { error: req.flash("error") });
})
module.exports=router;