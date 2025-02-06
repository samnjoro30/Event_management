let revenueChart, bookingsChart, usersChart;


function initializeCharts(data) {
    console.log("Initializing charts with data:", data);

    // Destroy existing charts if they exist
    if (revenueChart) revenueChart.destroy();
    if (bookingsChart) bookingsChart.destroy();
    if (usersChart) usersChart.destroy();

    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: data.revenue_labels,
            datasets: [{
                label: 'Revenue',
                data: data.revenue,
                borderColor: '#0056b3',
                backgroundColor: 'rgba(0, 86, 179, 0.1)',
                fill: true,
                tension: 0.4,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Months' } },
                y: { title: { display: true, text: 'Revenue (Ksh)' } },
            }
        }
    });

    // Bookings Chart
    const bookingsCtx = document.getElementById('bookingsChart').getContext('2d');
    bookingsChart = new Chart(bookingsCtx, {
        type: 'bar',
        data: {
            labels: data.booking_labels,
            datasets: [{
                label: 'Bookings',
                data: data.bookings,
                backgroundColor: ['#0056b3', '#4a90e2', '#73a1d8'],
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Events' } },
                y: { title: { display: true, text: 'Number of Bookings' } },
            }
        }
    });

    // Users Chart
    const usersCtx = document.getElementById('usersChart').getContext('2d');
    usersChart = new Chart(usersCtx, {
        type: 'pie',
        data: {
            labels: ['Active', 'Inactive'],
            datasets: [{
                label: 'Users',
                data: data.users,
                backgroundColor: ['#0056b3', '#e0e0e0'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                }
            }
        }
    });
}

function updateCharts(data) {
    console.log("Updating charts with data:", data);

    revenueChart.data.labels = data.revenue_labels;
    revenueChart.data.datasets[0].data = data.revenue;
    revenueChart.update();

    bookingsChart.data.labels = data.booking_labels;
    bookingsChart.data.datasets[0].data = data.bookings;
    bookingsChart.update();

    usersChart.data.datasets[0].data = data.users;
    usersChart.update();
}

function fetchStats() {
    console.log("Fetching stats...");
    fetch('/stats/')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Stats fetched:", data);
            if (!revenueChart || !bookingsChart || !usersChart) {
                initializeCharts(data);
            } else {
                updateCharts(data);
            }
        })
        .catch(error => console.error('Error fetching stats:', error));
}

fetchStats();
setInterval(fetchStats, 10000);
