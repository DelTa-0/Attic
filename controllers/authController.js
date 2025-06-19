const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/generateToken');

module.exports.registerUser= async function(req,res){
    try{
        let {email,password,fullname}=req.body;
        let user=await userModel.findOne({email:email});
        if(user) return res.status(401).send("you already have an account,login");
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async (err,hash)=>{
                if(err) return res.send(err.message);
                else{
                let user=await userModel.create({
                email,
                password:hash,
                fullname,

            });
            let token= generateToken(user);
            res.cookie("token",token);
            res.send("user created successfully");
        }

        })
        })
    
    res.send(user);
    }
    catch(err){
        console.log(err.message);
    };
};