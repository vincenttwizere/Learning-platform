const Joi = require('joi');
// Validate email
const validateEmail = email => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
// Validate password
const validatePassword = password => {
  // Password must be at least 8 characters long and contain at least one capital letter and one digit
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
  return passwordPattern.test(password);
};
// Validation schema for course data
const courseSchema = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  category_id: Joi.number().integer().required(),
  user_id: Joi.number().integer().required(),
});

// Function to validate course data
const validateCourse = data => {
  return courseSchema.validate(data);
};
module.exports = {
  validateEmail,
  validatePassword,
  validateCourse,
};
