async function bookEvent(event) {
  const eventId = event.target.getAttribute("data-event-id");

  try {
      // Construct the dynamic URL for booking
      const url = `/book-event/${eventId}/`;

      const response = await fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": getCSRFToken(), // Fetch CSRF token
          },
          body: JSON.stringify({ event_id: eventId }),
      });

      if (response.ok) {
          alert("Event booked successfully!");
      } else {
          alert("Failed to book event. Please try again.");
      }
  } catch (error) {
      console.error("Error booking event:", error);
      alert("An error occurred. Please try again.");
  }
}

// Helper function to get CSRF token from cookies
function getCSRFToken() {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
      if (cookie.startsWith("csrftoken=")) {
          return cookie.split("=")[1];
      }
  }
  return "";
}
