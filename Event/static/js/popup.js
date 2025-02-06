
// Close the popup when the close button is clicked
document.querySelector(".close-popup").addEventListener("click", () => {
    document.getElementById("booking-popup").classList.remove("visible");
  });
  
  // Close the popup when clicking outside of it
  document.getElementById("booking-popup").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      e.target.classList.remove("visible");
    }
  });

  document.getElementById("tickets").addEventListener("input", (e) => {
    const tickets = parseInt(e.target.value);
    const pricePerTicket = 500; // Set your ticket price here
    const totalAmount = tickets * pricePerTicket;
  
    // Update total amount in the popup
    document.querySelector("#total-amount span").textContent = totalAmount || 0;
  });
  
  document.getElementById("confirm-booking").addEventListener("click", async () => {
    const eventId = document.getElementById("booking-popup").getAttribute("data-event-id");
    const tickets = parseInt(document.getElementById("tickets").value);
    const paymentMethod = document.getElementById("payment-method").value;
    const csrfToken = getCSRFToken();
  
    try {
      const response = await fetch(`/book-event/${eventId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({
          tickets,
          payment_method: paymentMethod,
        }),
      });
  
      if (response.ok) {
        alert("Event booked successfully!");
        document.getElementById("booking-popup").classList.remove("visible");
        fetchBookings();
      } else {
        alert("Failed to book event. Please try again.");
      }
    } catch (error) {
      console.error("Error booking event:", error);
      alert("An error occurred. Please try again.");
    }
  });
  