const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();


router.post('/', productController.save);
router.get('/', productController.getAll);
router.delete('/:id', productController.deleteById);
router.put('/:id', productController.edit)


module.exports = router;