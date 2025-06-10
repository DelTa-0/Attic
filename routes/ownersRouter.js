const express = require('express');
const router=express.Router();
const ownerModel = require('../models/owner-model');

router.get('/',function(req,res){
    res.send("hey");
})

console.log(process.env.NODE_ENV);


if(process.env.NODE_ENV==="development"){
   router.post('/create',async function(req,res){
    let owners=await ownerModel.find();
    if(owners.length>0) return res
    .send(503)
    .send("you dont have permission");
})
    
}


module.exports=router;