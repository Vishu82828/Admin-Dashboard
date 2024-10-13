let x = document.getElementById("btn");
x.addEventListener("click", () => {
    let table = document.getElementById("mytable");
    if (table.style.display === "none") {
        table.style.display = "inline-block";
    } else {
        table.style.display = "none";
    }
});
x.addEventListener("click", fetch_data);

async function fetch_data() {
    let stdata = await fetch("http://localhost:3000/Employee");
    let json_data = await stdata.json();
    let data = json_data.map((value) => `
        <tr>
            <td>${value.id}</td>
            <td>${value.name}</td>
            <td>${value.url}</td>
            <td>${value.email}</td>
            <td>${value.streetAddress}</td>
            <td><button onclick="mydel('${value.id}')" class="tablebutton">Delete</button></td>
            <td><button onclick="myedit(${value.id})" class="tablebutton" id="editbutton">Edit</button></td>
        </tr>
    `).join("");
    document.getElementById("showdata").innerHTML = data;
    removeButtonBackgroundColor(); // Call after DOM update
}

function removeButtonBackgroundColor() {
    let buttons = document.querySelectorAll('.tablebutton');
    buttons.forEach(button => {
        button.style.backgroundColor = ''; // Removes background color
    });
}

document.getElementById("insert").addEventListener("click", insert_data);

function insert_data(click) {
    click.preventDefault();
    let formData = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        url: document.getElementById("url").value,
        email: document.getElementById("email").value,
        streetAddress: document.getElementById("streetAddress").value,
    };
    console.log("Form Data:", formData);

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
        console.log("Success:", data);
        alert("Successfully inserted!");
        fetch_data(); // Refresh the table after insertion
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error, not inserted");
    });
}

document.getElementById("toggle").addEventListener("click", () => {   // Insert Button Functionility
    let form = document.getElementById("myform");
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}); 

document.getElementById("editbutton").addEventListener("click", () => {    // edit button toggle
    let form = document.getElementById("demoo");
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}); 

function mydel(id) {
    fetch(`http://localhost:3000/Employee/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        alert("Deleted");
        fetch_data(); // Refresh the table after deletion
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

async function myedit(id) {
    let stdata = await fetch(`http://localhost:3000/Employee/${id}`);
    let data = await stdata.json();
    let frm = `
    <div class="form-group">
        <input type="text" value="${data.id}" readonly ><br><br>
    </div>
    <div class="form-group">
        <input type="text" value="${data.name}" id="ename"><br><br>
    </div>
    <div class="form-group">
        <input type="text" value="${data.username}" id="eusername"><br><br>
    </div>
    <div class="form-group">
        <input type="text" value="${data.email}" id="eemail"><br><br>
    </div>
    <button type="button" onclick="finalupdate('${data.id}')">Update</button>
    `;

    let editForm = document.getElementById('demoo');
    editForm.innerHTML = frm;
    editForm.style.display = 'block'; // Show the form when editing
}

function finalupdate(id) {
    let name = document.getElementById('ename').value;
    let username = document.getElementById('eusername').value;
    let email = document.getElementById('eemail').value;

    fetch(`http://localhost:3000/Employee/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, username, email })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("Updated successfully:", data);
        alert("Successfully updated!");
        fetch_data(); // Refresh the table after update
        document.getElementById('demoo').style.display = 'none'; // Hide the form after update
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error, not updated");
    });
}
