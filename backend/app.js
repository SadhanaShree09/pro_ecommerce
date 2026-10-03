const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require('./config/connectDatabase');
const cors = require('cors');
dotenv.config({path: path.join(__dirname,'config' , 'config.env')})

const products = require('./routes/product');
const orders = require('./routes/order');

app.use(cors());
app.use(express.json());
app.use(async (req, res, next) => {
    try {
        await connectDatabase();
        next();
    } catch (error) {
        console.error('Database connection failed:', error.message);
        res.status(503).json({ success: false, message: 'Database unavailable.' });
    }
});
app.use('/api/v1/',products);
app.use('/api/v1/',orders);

app.get('/api/v1/health', (req, res) => {
    res.json({ success: true, service: 'ecomcart-api' });
});

if (require.main === module) {
    connectDatabase().then(() => {
        app.listen(process.env.PORT || 8000,() =>{
            console.log(`server listening in port ${process.env.PORT} in ${process.env.NODE_ENV}`)
        });
    }).catch((error) => {
        console.error('Database connection failed:', error.message);
        process.exitCode = 1;
    });
}

module.exports = app;