const { Course, Category, User } = require('../models');
const { validateCourse } = require('../utils/validation');
const logger = require('../utils/logger');

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [
        { model: Category, as: 'category' },
        { model: User, as: 'user' },
      ],
    });
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    logger.error(`Error fetching all courses: ${error.message}`);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Get single course by ID
const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id, {
      include: [
        { model: Category, as: 'category' },
        { model: User, as: 'user' },
      ],
    });
    if (!course) {
      logger.error(`Course with ID ${id} not found`);
      return res
        .status(404)
        .json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    logger.error(`Error fetching course by ID ${id}: ${error.message}`);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Create a new course
const createCourse = async (req, res) => {
  const { name, description, category_id, user_id } = req.body;
  // Validate request body
  const { error } = validateCourse(req.body);
  if (error) {
    logger.error(`Invalid course data: ${error.message}`);
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  }
  try {
    const course = await Course.create({
      name,
      description,
      category_id,
      user_id,
    });
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    logger.error(`Error creating course: ${error.message}`);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Update a course
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, description, category_id, user_id } = req.body;
  try {
    const course = await Course.findByPk(id);
    if (!course) {
      logger.error(`Course with ID ${id} not found`);
      return res
        .status(404)
        .json({ success: false, message: 'Course not found' });
    }
    // Validate request body
    const { error } = validateCourse(req.body);
    if (error) {
      logger.error(`Invalid course data: ${error.message}`);
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
    await course.update({ name, description, category_id, user_id });
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    logger.error(`Error updating course with ID ${id}: ${error.message}`);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id);
    if (!course) {
      logger.error(`Course with ID ${id} not found`);
      return res
        .status(404)
        .json({ success: false, message: 'Course not found' });
    }
    await course.destroy();
    res
      .status(200)
      .json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting course with ID ${id}: ${error.message}`);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
