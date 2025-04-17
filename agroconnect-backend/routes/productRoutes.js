const express = require('express');
const router = express.Router();
const { createProduct , getProducts } = require('../controllers/productController');
const upload = require('../middleware/upload');

router.post('/add', upload.array('images', 5), createProduct); // Accept up to 5 images
router.get('/products', getProducts); 
module.exports = router;
