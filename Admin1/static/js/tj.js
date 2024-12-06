document.addEventListener("DOMContentLoaded", function () {
    const addEventBtn = document.getElementById("add-event-btn");
    const viewEventsBtn = document.getElementById("view-events-btn");
    const viewBookingsBtn = document.getElementById("view-bookings-btn");
    const viewStatsBtn = document.getElementById("view-stats-btn");

    const addEventSection = document.getElementById("add-event-section");
    const viewEventsSection = document.getElementById("view-events-section");
    const viewBookingsSection = document.getElementById("view-bookings-section");
    const viewStatsSection = document.getElementById("view-stats-section");

    // Function to hide all sections
    function hideAllSections() {
        addEventSection.classList.add("hidden");
        viewEventsSection.classList.add("hidden");
        viewBookingsSection.classList.add("hidden");
        viewStatsSection.classList.add("hidden");
    }

    // Show Add Event Section
    addEventBtn.addEventListener("click", function () {
        hideAllSections();
        addEventSection.classList.remove("hidden");
    });

    // Show View Events Section
    viewEventsBtn.addEventListener("click", function () {
        hideAllSections();
        viewEventsSection.classList.remove("hidden");
    });

    // Show View Bookings Section
    viewBookingsBtn.addEventListener("click", function () {
        hideAllSections();
        viewBookingsSection.classList.remove("hidden");
    });

    // Show Statistics Section
    viewStatsBtn.addEventListener("click", function () {
        hideAllSections();
        viewStatsSection.classList.remove("hidden");
    });
});
