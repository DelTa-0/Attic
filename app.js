const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app=express();
const ejs = require('ejs');
const db = require('./config/mongoose-connection');
const ownersRouter=require("./routes/ownersRouter");
const usersRouter=require("./routes/usersRouter");
const productsRouter=require("./routes/productsRouter");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());
app.set('view engine','ejs');


app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);


app.listen(3000);