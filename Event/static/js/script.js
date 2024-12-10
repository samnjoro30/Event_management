document.addEventListener('DOMContentLoaded', () => {
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const welcomeLogin = document.getElementById('welcome-login');
    const welcomeRegister = document.getElementById('welcome-register');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
  
    // Switch to Register
    switchToRegister.addEventListener('click', () => {
      welcomeLogin.classList.remove('active');
      welcomeRegister.classList.add('active');
      loginForm.classList.remove('active');
      registerForm.classList.add('active');
    });

  
    // Switch to Login
    switchToLogin.addEventListener('click', () => {
      welcomeRegister.classList.remove('active');
      welcomeLogin.classList.add('active');
      registerForm.classList.remove('active');
      loginForm.classList.add('active');
    });
  });

  
  function togglePasswordVisibility(id) {
    const passwordInput = document.getElementById(id);
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  }
  
const passwordInput = document.getElementById("register-password");
const passwordFeedback = document.createElement("div");
passwordFeedback.style.color = "red";
passwordInput.parentNode.insertBefore(passwordFeedback, passwordInput.nextSibling);

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const errors = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number.");
  }
  if (!/[@$!%*?&]/.test(password)) {
    errors.push("Password must contain at least one special character (@, $, !, %, *, ?, &).");
  }

  if (errors.length > 0) {
    passwordFeedback.innerHTML = errors.join("<br>");
  } else {
    passwordFeedback.innerHTML = "<span style='color: green;'>Password looks good!</span>";
  }
});


const hamburger = document.querySelector('.hamburger-menu');
const header = document.querySelector('.main-header');

hamburger.addEventListener('click', () => {
  header.classList.toggle('active'); // Toggle menu visibility
});

