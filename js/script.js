const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});



  function validateForm() {
    // Get form inputs
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Regular expression for email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    // Validate password (optional)
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return false;
    }

    return true;
  }

  // script for frequently asked question

  

  document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.question');
  
    questions.forEach(function(question) {
      question.addEventListener('click', function() {
        question.classList.toggle('clicked');
        const answer = question.nextElementSibling;
        answer.classList.toggle('clicked');
      });
    });
  });
  