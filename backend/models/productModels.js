const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({

    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: '' },
    ratings: { type: Number, default: 0, min: 0, max: 5 },
    category: { type: String, default: 'General' },
    images:[{
        image: String
    }],
    seller: { type: String, default: 'Ecomcart' },
    stock: { type: Number, default: 0, min: 0 },
    numOfReviews: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

const productModel = mongoose.model('Product',productSchema);
module.exports = productModel;