// Show/Hide Table when "Click to show Data" button is clicked
let x = document.getElementById("btn");
x.addEventListener("click", () => {
    let table = document.getElementById("mytable");
    table.style.display = table.style.display === "none" ? "inline-block" : "none";
    fetch_data(); // Fetch data when showing the table
});

// Fetch data from the server and populate the table
async function fetch_data() {
    let stdata = await fetch("http://localhost:3000/Employee");
    let json_data = await stdata.json();
    let data = json_data.map((value) => `
        <tr>
            <td>${value.id}</td>
            <td>${value.name}</td>
            <td>${value.username}</td>
            <td>${value.email}</td>
            <td>${value.streetAddress}</td>
            <td><button onclick="mydel('${value.id}')" class="tablebutton">Delete</button></td>
            <td><button onclick="myedit(${value.id})" class="tablebutton">Edit</button></td>
        </tr>
    `).join("");
    document.getElementById("showdata").innerHTML = data;
}

function generateUniqueId() {
    //return 'id-' + Date.now(); // Simple unique ID based on timestamp
    return Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
}

// Insert data when the "Submit" button is clicked
document.getElementById("insert").addEventListener("click", insert_data);

function insert_data(event) {
    event.preventDefault();
    let formData = {
        id:  generateUniqueId(), // Automatically generated ID
        name: document.getElementById("name").value,
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        streetAddress: document.getElementById("streetAddress").value, // Fetch address correctly
    };

    fetch("http://localhost:3000/Employee", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert("Successfully inserted!");
        document.getElementById("myform").reset(); // Clear form
        fetch_data(); // Refresh the table
    })
    .catch(error => {
        alert("Error, not inserted");
    });
}

// Toggle Insert Form visibility
document.getElementById("toggle").addEventListener("click", () => {
    let form = document.getElementById("myform");
    form.style.display = form.style.display === "none" ? "block" : "none";
});

// Edit data and populate the edit form
async function myedit(id) {
    let stdata = await fetch(`http://localhost:3000/Employee/${id}`);
    let data = await stdata.json();
    document.getElementById('editId').value = data.id; // Populate the ID field
    document.getElementById('ename').value = data.name; // Populate the name field
    document.getElementById('eusername').value = data.username || ''; // Populate the username field
    document.getElementById('eemail').value = data.email; // Populate the email field
    document.getElementById('address').value = data.streetAddress; // Populate the address field (ensure consistency)
    document.getElementById('demoo').style.display = 'block'; // Show the edit form
}

// Update the employee record when the update form is submitted
function finalupdate() {
    let id = document.getElementById('editId').value; // Get ID from the readonly input
    let name = document.getElementById('ename').value;
    let username = document.getElementById('eusername').value;
    let email = document.getElementById('eemail').value;
    let streetAddress = document.getElementById('address').value; // Fetch streetAddress correctly

    fetch(`http://localhost:3000/Employee/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, username, email, streetAddress }) // Include address in the update
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert("Successfully updated!");
        fetch_data(); // Refresh the table
        document.getElementById('demoo').style.display = 'none'; // Hide the form after update
    })
    .catch(error => {
        alert("Error, not updated");
    });
}

// Delete an employee record when the delete button is clicked
function mydel(id) {
    fetch(`http://localhost:3000/Employee/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert("Deleted");
        fetch_data(); // Refresh the table after deletion
    })
    .catch(error => {
        alert('Error deleting the entry');
    });
}