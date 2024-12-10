document.addEventListener("DOMContentLoaded", () => {
  const addEventSection = document.getElementById("add-event-section");
  const viewEventsSection = document.getElementById("view-events-section");
  const viewBookingsSection = document.getElementById("view-bookings-section");
  const viewStatsSection = document.getElementById("view-stats-section"); // Statistics Section

  const addEventBtn = document.getElementById("add-event-btn");
  const viewEventsBtn = document.getElementById("view-events-btn");
  const viewBookingsBtn = document.getElementById("view-bookings-btn");
  const viewStatsBtn = document.getElementById("view-stats-btn"); // Statistics Button


  
  function showSection(section) {
    // Hide all sections first
    
    document.querySelectorAll(".admin-section").forEach((sec) => {
      sec.classList.remove("visible");
      sec.classList.add("hidden"); // Ensure other sections are hidden
    });

    // Show the target section
    section.classList.remove("hidden");
    section.classList.add("visible");
  }

  // Event Listeners
  if (addEventBtn) {
    addEventBtn.addEventListener("click", () => showSection(addEventSection));
  }
  if (viewEventsBtn) {
    viewEventsBtn.addEventListener("click", () => showSection(viewEventsSection));
  }
  if (viewBookingsBtn) {
    viewBookingsBtn.addEventListener("click", () => showSection(viewBookingsSection));
  }
  if (viewStatsBtn) {
    
    viewStatsBtn.addEventListener("click", () => showSection(viewStatsSection));
  }
});
