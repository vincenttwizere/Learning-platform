// category.controller.js
const { Category } = require('../models');
const logger = require('../utils/logger/index');

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({
      ok: true,
      message: 'Categories retrieved successfully',
      data: categories,
    });
  } catch (error) {
    logger.error(`Error retrieving categories: ${error.message}`);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.status(201).json({
      ok: true,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    logger.error(`Error creating category: ${error.message}`);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ ok: false, message: 'Category not found' });
    }
    await category.destroy();
    res
      .status(200)
      .json({ ok: true, message: 'Category deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting category: ${error.message}`);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
};
