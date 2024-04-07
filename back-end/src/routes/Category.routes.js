// routes/category.routes.js
const express = require('express');

const {
  getAllCategories,
  createCategory,
  deleteCategory,
} = require('../controllers/Category.controller');

const router = express.Router();

// Route to get all categories
router.get('/', getAllCategories);

// Route to create a new category
router.post('/', createCategory);

// Route to delete a category
router.delete('/:id', deleteCategory);

module.exports = router;
