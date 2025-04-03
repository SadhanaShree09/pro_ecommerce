const express = require('express');
const { getOrder } = require('../controllers/orderController');
const { route } = require('./product');
const router = express.Router();
router.route('/order').post(getOrder);
module.exports = router;