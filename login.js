document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginButton = document.getElementById("loginButton");
  const feedbackMessage = document.getElementById("feedbackMessage");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      feedbackMessage.textContent = "Please enter both email and password.";
      feedbackMessage.classList.add("error");
      return;
    }

    loginButton.disabled = true; // Disable button during submission
    loginButton.innerHTML = `<div class="loader"></div>`; // Show loader on button

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed.");
      }

      const data = await response.json();
      // Handle successful login response
      feedbackMessage.textContent = "Login successful!";
      feedbackMessage.classList.remove("error");
      feedbackMessage.classList.add("success");
    
       window.location.href = "/front-end";
    } catch (error) {
      console.error("Error logging in:", error.message);
      // Handle login error
      feedbackMessage.textContent = "Login failed. Please try again.";
      feedbackMessage.classList.add("error");
    } finally {
      loginButton.disabled = false; 
      loginButton.innerHTML = "Sign In"; 
    }
  });
});
