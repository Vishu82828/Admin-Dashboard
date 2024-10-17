function updateDateTime() {
    const now = new Date();

    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-IN',{ year: 'numeric', month: 'long', day: 'numeric' });

    document.getElementById('digitalClock').textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// Set initial values and update every second
updateDateTime();
setInterval(updateDateTime, 1000);

