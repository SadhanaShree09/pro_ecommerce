const orderModel =  require('../models/orderModels');
const productModel = require ('../models/productModels');

exports.getOrder = async(req,res,next) =>{
    try {
        const cartItems = req.body;
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({ success: false, message: 'Your cart is empty.' });
        }
        const amount = Number(cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)).toFixed(2);
        const order = await orderModel.create({ cartItems, amount, status: 'Pending' });

        await Promise.all(cartItems.map(async (item) => {
            const product = await productModel.findById(item.product._id);
            if (product) {
                product.stock = Math.max(0, product.stock - item.qty);
                await product.save();
            }
        }));

        res.status(201).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Unable to place order.' });
    }
}