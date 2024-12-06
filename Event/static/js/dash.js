document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.querySelector(".logout-btn");
  
    logoutBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to logout?")) {
        window.location.href = "/auth"; // Redirect to logout endpoint
      }
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    const profileBtn = document.querySelector(".profile-btn");
    const profilePopup = document.getElementById("profile-popup");
    const closePopupBtn = document.querySelector(".close-popup-btn");
  
    if (profileBtn && profilePopup && closePopupBtn) {
      // Show the popup when the profile button is clicked
      profileBtn.addEventListener("click", () => {
        profilePopup.classList.add("show"); // Add the "show" class
        profilePopup.classList.remove("hidden"); // Remove "hidden" class
      });
  
      // Hide the popup when the close button is clicked
      closePopupBtn.addEventListener("click", () => {
        profilePopup.classList.add("hidden"); // Add "hidden" class
        profilePopup.classList.remove("show"); // Remove "show" class
      });
  
      // Hide the popup when clicking outside of it
      document.addEventListener("click", (event) => {
        if (
          !profilePopup.contains(event.target) &&
          !profileBtn.contains(event.target)
        ) {
          profilePopup.classList.add("hidden"); // Add "hidden" class
          profilePopup.classList.remove("show"); // Remove "show" class
        }
      });
    } else {
      console.error("Profile button or popup not found in the DOM.");
    }
  });
  
 