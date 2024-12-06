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

  // document.addEventListener("DOMContentLoaded", () => {
  //   const dobInput = document.getElementById("dob"); 
  //   const nextButton = document.getElementById("next-to-security");
  //   const ageValidationMessage = document.getElementById("age-validation-message");
  //   const personalInfoSection = document.getElementById("personal-info-section");
  //   const securitySection = document.getElementById("security-section");
  //   const lastSection = document.getElementById("confirmation-section");
  //   const prevButton = document.getElementById("prev-to-personal");
  //   const ntc =document.getElementById("next-to-confirm");
  //   const prevToSecurityButton = document.getElementById("prev-to-security");
  //   const sec = document.getElementById("sec-section");
  

  //   // Validate Age and Navigate to Security Section
  //   nextButton.addEventListener("click", () => {
  //     const firstName = document.querySelector('input[name="first_name"]').value;
  //     const lastName = document.querySelector('input[name="last_name"]').value;
      
     
  //       if (!firstName || !lastName) {
  //         ageValidationMessage.textContent = "Please fill out all fields.";
  //         return;
  //       }
        
  //     const dobValue = new Date(dobInput.value);
  //     const today = new Date();
  //     const age = today.getFullYear() - dobValue.getFullYear();
  //     const monthDiff = today.getMonth() - dobValue.getMonth();
  //     const dayDiff = today.getDate() - dobValue.getDate();
  
  //     // Adjust age for month/day differences
  //     if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
  //       age--;
  //     }
  
  //     if (!dobInput.value) {
  //       ageValidationMessage.textContent = "Please enter your date of birth.";
  //     } else if (age < 18) {
  //       ageValidationMessage.textContent = "You must be at least 18 years old to register.";
  //     } else {
  //       ageValidationMessage.textContent = ""; // Clear the message
  //       personalInfoSection.style.display = "none";
  //       securitySection.style.display = "block";
  //     }
  //   });
    
  //   ntc.addEventListener("click", (e) => {
  //       e.preventDefault();
  //       securitySection.style.display = "none";
  //       lastSection.style.display = "block";
  //    });
  //   prevToSecurityButton.addEventListener("click", () => {
  //       confirmationSection.style.display = "none";
  //       securitySection.style.display = "block";
  //     });
  //   // Navigate back to the Personal Information Section
  //   prevButton?.addEventListener("click", () => {
  //     personalInfoSection.style.display = "block";
  //     securitySection.style.display = "none";
  //   });
  // });


  
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

