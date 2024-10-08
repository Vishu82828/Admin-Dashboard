let x = document.getElementById("btn")
x.addEventListener("click",()=>{
    let table = document.getElementById("mytable")
    if(table.style.display === "none"){
        table.style.display = "inline-block"
    } else {
        table.style.display = "none"
    }
})
x.addEventListener("click",fetch_data)
async function fetch_data() {
    let stdata = await fetch("http://localhost:3000/Employee")
    let json_data = await stdata.json()
    //console.log(json_data)
    let data = json_data.map((value)=>`
    
    <tr>
        <td>${value.id}</td>
        <td>${value.name}</td>
        <td>${value.url}</td>
        <td>${value.email}</td>
        <td>${value.streetAddress}</td>
        <button onclick="mydel('${value.id}')">Delete</button>
        <td><button onclick="(myedit(${value.id}))">Edit</button></td>
    </tr>

    `).join("")
    document.getElementById("showdata").innerHTML = data
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
    // .then(()=>{alert("Successfully inserted .. !!!")})
    // .catch(()=>{alert("Error, not inserted")})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("Success:", data);
        alert("Successfully inserted!");
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error, not inserted");
    });
}

document.getElementById("toggle").addEventListener("click",()=>{
    let form = document.getElementById("myform")
    if(form.style.display === "none"){
        form.style.display = "block"
    } else {
        form.style.display = "none"
    }
}) 

function mydel(id) {
    fetch(`http://localhost:3000/Employee/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        alert("Deleted");
        fetch_data()
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}