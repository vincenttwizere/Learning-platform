const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/Course.controller');

// Route to get all courses
router.get('/', getAllCourses);

// Route to get a single course by ID
router.get('/:id', getCourseById);

// Route to create a new course
router.post('/', createCourse);

// Route to update a course by ID
router.put('/:id', updateCourse);

// Route to delete a course by ID
router.delete(':id', deleteCourse);

module.exports = router;
