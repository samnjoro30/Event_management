document.addEventListener("DOMContentLoaded", () => {
  const dobInput = document.getElementById("dob"); 
  const nextButton = document.getElementById("next-to-security");
  const ageValidationMessage = document.getElementById("age-validation-message");
  const personalInfoSection = document.getElementById("personal-info-section");
  const securitySection = document.getElementById("security-section");
  const lastSection = document.getElementById("confirmation-section");
  const prevButton = document.getElementById("prev-to-personal");
  const ntc = document.getElementById("next-to-confirm");
  const prevToSecurityButton = document.getElementById("prev-to-security");
  
  // Validate Age and Navigate to Security Section
  nextButton?.addEventListener("click", () => {
    const firstName = document.querySelector('input[name="first_name"]').value;
    const lastName = document.querySelector('input[name="last_name"]').value;

    if (!firstName || !lastName) {
      ageValidationMessage.textContent = "Please fill out all fields.";
      return;
    }

    const dobValue = new Date(dobInput.value);
    const today = new Date();
    let age = today.getFullYear() - dobValue.getFullYear();
    const monthDiff = today.getMonth() - dobValue.getMonth();
    const dayDiff = today.getDate() - dobValue.getDate();

    // Adjust age for month/day differences
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (!dobInput.value) {
      ageValidationMessage.textContent = "Please enter your date of birth.";
    } else if (age < 18) {
      ageValidationMessage.textContent = "You must be at least 18 years old to register.";
    } else {
      ageValidationMessage.textContent = ""; // Clear the message
      personalInfoSection.style.display = "none";
      securitySection.style.display = "block";
    }
  });

  // Navigate to Confirmation Section
  ntc?.addEventListener("click", () => {
    securitySection.style.display = "none";
    lastSection.style.display = "block";
  });

  // Navigate Back to Security Section from Confirmation
  prevToSecurityButton?.addEventListener("click", () => {
    lastSection.style.display = "none";
    securitySection.style.display = "block";
  });

  // Navigate Back to Personal Information Section
  prevButton?.addEventListener("click", () => {
    personalInfoSection.style.display = "block";
    securitySection.style.display = "none";
  });
});

document.getElementById('register-form').onsubmit = function() {
  // Ensure all hidden sections are visible
  document.querySelectorAll('div[style="display: none"]').forEach(div => {
      div.style.display = 'block';
  });
}


