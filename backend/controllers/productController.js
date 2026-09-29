const ProductModel = require('../models/productModels');
exports.getProducts = async (req,res,next) =>{
    try {
        const query = req.query.keyword ? {
            name: { $regex: req.query.keyword, $options: 'i' }
        } : {};
        const products = await ProductModel.find(query).sort({ createdAt: -1 });
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Unable to load products.' });
    }
}
exports.getSingleProduct = async (req,res,next) =>{
    try{
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }
        res.json({
            success : true,
            product
        })
    }
    catch(error){
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

