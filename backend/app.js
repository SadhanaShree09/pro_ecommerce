const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require('./config/connectDatabase');
const cors = require('cors');
dotenv.config({path: path.join(__dirname,'config' , 'config.env')})

const products = require('./routes/product');
const orders = require('./routes/order');

connectDatabase();
app.use(cors());
app.use(express.json());
app.use('/api/v1/',products);
app.use('/api/v1/',orders);

app.get('/api/v1/health', (req, res) => {
    res.json({ success: true, service: 'ecomcart-api' });
});

app.listen(process.env.PORT || 8000,() =>{
    console.log(`server listening in port ${process.env.PORT} in ${process.env.NODE_ENV}`)
});