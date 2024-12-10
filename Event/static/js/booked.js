document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners to buttons
    document.getElementById("myBookingsBtn").addEventListener("click", loadMyBookings);
    document.getElementById("exploreBtn").addEventListener("click", loadExploreEvents);
    document.getElementById("viewEventsBtn").addEventListener("click", loadUpcomingEvents);
});

// Function to fetch and display user's bookings
async function loadMyBookings(event) {
    event.preventDefault(); // Prevent default navigation
    try {
        const response = await fetch('/api/my-bookings'); // API endpoint for user bookings
        const bookings = await response.json();
        const container = document.getElementById('content-container');
        container.innerHTML = ''; // Clear existing content
        bookings.forEach(booking => {
            const bookingCard = `
                <div class="booking-card">
                    <h3>Event: ${booking.event_name}</h3>
                    <p>Tickets: ${booking.tickets_booked}</p>
                    <p>Status: ${booking.status}</p>
                </div>
            `;
            container.innerHTML += bookingCard;
        });
    } catch (error) {
        console.error("Error loading bookings:", error);
    }
}

