const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const ProductModel = require('./models/productModels');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

async function seed() {
    await mongoose.connect(process.env.DB_URL);
    const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf8'));
    await ProductModel.deleteMany({});
    await ProductModel.insertMany(products);
    console.log(`Seeded ${products.length} products.`);
    await mongoose.disconnect();
}

seed().catch((error) => {
    console.error('Seeding failed:', error.message);
    process.exitCode = 1;
});
