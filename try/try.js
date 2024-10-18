// Toggle Dark Mode / Light Mode
document.querySelector('.theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelectorAll('.theme-toggle span').forEach(span => {
        span.classList.toggle('active');
    });
});

// Toggle Recent Orders and Employee Table
function toggleTableView() {
    const recentOrders = document.querySelector('.recent-order');
    const employeeTable = document.querySelector('.employee-table');

    if (recentOrders.style.display === 'none') {
        recentOrders.style.display = 'block';
        employeeTable.style.display = 'none';
    } else {
        recentOrders.style.display = 'none';
        employeeTable.style.display = 'block';
    }
}

document.querySelector('.toggle-button').addEventListener('click', toggleTableView);

// Auto-connect hyperlink to recent orders
document.querySelectorAll('.table-button').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = '#recent-orders';
        toggleTableView(); // Switch to table view when button is clicked
    });
}  );

function updateDateTime() {
    const dateElement = document.getElementById('currentDate');
    const clockElement = document.getElementById('digitalClock');

    // Update the date
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString(undefined, options);
    dateElement.textContent = formattedDate;

    // Update the clock
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Call the function immediately to set initial values
updateDateTime();

// Update the clock every second
setInterval(updateDateTime, 1000);

