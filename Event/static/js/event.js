async function bookEvent(event) {
    const eventId = event.target.dataset.eventId;
    const ticketsRequested = prompt("Enter the number of tickets:");

    if (!ticketsRequested || isNaN(ticketsRequested) || ticketsRequested <= 0) {
        alert("Please enter a valid number of tickets.");
        return;
    }

    try {
        const response = await fetch(`/book-event/${eventId}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken(),
            },
            body: JSON.stringify({ tickets: ticketsRequested }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            // Optionally reload events to reflect updated ticket count
            fetchEvents();
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error("Error booking event:", error);
        alert("Something went wrong. Please try again.");
    }
}

// Helper function to get CSRF token
function getCSRFToken() {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "csrftoken") return value;
    }
    return "";
}

