document.addEventListener("DOMContentLoaded", () => {
    const addEventSection = document.getElementById("add-event-section");
    const viewEventsSection = document.getElementById("view-events-section");
    const viewBookingsSection = document.getElementById("view-bookings-section");
  
    const addEventBtn = document.getElementById("add-event-btn");
    const viewEventsBtn = document.getElementById("view-events-btn");
    const viewBookingsBtn = document.getElementById("view-bookings-btn");
  
    function showSection(section) {
      document.querySelectorAll(".admin-section").forEach((sec) => {
        sec.classList.remove("visible");
      });
      section.classList.add("visible");
    }
  
    addEventBtn.addEventListener("click", () => showSection(addEventSection));
    viewEventsBtn.addEventListener("click", () => showSection(viewEventsSection));
    viewBookingsBtn.addEventListener("click", () => showSection(viewBookingsSection));
  });
  