const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({

    name:String,
    price :String,
    desciption :String,
    rating :String,
    category :String,
    images:[{
        images: String
    }],
    seller :String,
    stock:String,
    numOfReviews:String,
    createdAt: Date
});

const productModel = mongoose.model('Product',productSchema);
module.exports = productModel;