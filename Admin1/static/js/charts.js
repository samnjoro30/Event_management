// Define chart instances
let revenueChart, bookingsChart, usersChart;

// Initialize all charts
function initializeCharts(data) {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: data.revenue_labels, // Dynamic labels from backend
            datasets: [{
                label: 'Revenue',
                data: data.revenue, // Dynamic data from backend
                borderColor: '#0056b3',
                backgroundColor: 'rgba(0, 86, 179, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: { display: true, text: 'Months' }
                },
                y: {
                    title: { display: true, text: 'Revenue (Ksh)' }
                }
            }
        }
    });

    // Bookings Chart
    const bookingsCtx = document.getElementById('bookingsChart').getContext('2d');
    bookingsChart = new Chart(bookingsCtx, {
        type: 'bar',
        data: {
            labels: data.booking_labels, // Event names
            datasets: [{
                label: 'Bookings',
                data: data.bookings, // Dynamic data from backend
                backgroundColor: ['#0056b3', '#4a90e2', '#73a1d8']
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: { display: true, text: 'Events' }
                },
                y: {
                    title: { display: true, text: 'Number of Bookings' }
                }
            }
        }
    });

    // Users Chart
    const usersCtx = document.getElementById('usersChart').getContext('2d');
    usersChart = new Chart(usersCtx, {
        type: 'pie',
        data: {
            labels: ['Active', 'Inactive'], // Static labels
            datasets: [{
                label: 'Users',
                data: data.users, // Dynamic data from backend
                backgroundColor: ['#0056b3', '#e0e0e0']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });
}

// Update charts with new data
function updateCharts(data) {
    // Update Revenue Chart
    revenueChart.data.labels = data.revenue_labels;
    revenueChart.data.datasets[0].data = data.revenue;
    revenueChart.update();

    // Update Bookings Chart
    bookingsChart.data.labels = data.booking_labels;
    bookingsChart.data.datasets[0].data = data.bookings;
    bookingsChart.update();

    // Update Users Chart
    usersChart.data.datasets[0].data = data.users;
    usersChart.update();
}

// Fetch data from the backend
function fetchStats() {
    fetch(  '/stats/' ) // Replace with the correct URL for your stats API
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (!revenueChart || !bookingsChart || !usersChart) {
                // Initialize charts for the first time
                initializeCharts(data);
            } else {
                // Update charts with new data
                updateCharts(data);
            }
        })
        .catch(error => console.error('Error fetching stats:', error));
}

// Fetch stats initially and then every 10 seconds
fetchStats();
setInterval(fetchStats, 10000); // Update every 10 seconds
