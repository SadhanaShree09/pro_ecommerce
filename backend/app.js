const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const products = require('./routes/product');
const orders = require('./routes/order');
app.use('/api/v1/',products);
app.use('/api/v1/',orders);

dotenv.config({path: path.join(__dirname,'config' , 'config.env')})
app.listen(process.env.PORT,() =>{
    console.log(`server listening in port ${process.env.PORT} in ${process.env.NODE_ENV}`)
});