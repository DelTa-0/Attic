const express = require('express');
const router=express.Router();
const userModel = require('../models/user-model');

router.get('/',function(req,res){
    res.send("hey");
})

router.get('/register',(req,res)=>{
res.render('index', { error: 'error occured' }); 

})

router.post('/register',async function(req,res){
    try{
        let {email,username,fullname}=req.body;
    let user=await userModel.create({
        email,
        password,
        fullname,

    });
    res.send(user);
    }
    catch(err){
        console.log(err.message);
    }
})

module.exports=router;