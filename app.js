const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app=express();
const ejs = require('ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());
app.set('view engine','ejs');

app

app.get('/',(req,res)=>{
    res.send("hello");
})


app.listen(3000);