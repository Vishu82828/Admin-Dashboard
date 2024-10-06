document.getElementById("btn").addEventListener("click",fun1)
async function fun1(click){
    click.preventDefault()

   let data = {
    name : document.getElementById("name").value,
    password : document.getElementById("pass").value
   }

   fetch("http://localhost:3000/Admin", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data) })
}

let stdata = await fetch("http://localhost:3000/Admin")
let json_store = await stdata.json()
console.log(json_store)



// 
document.getElementById("btn").addEventListener("click", fun1);

async function fun1(click) {
    click.preventDefault();

    let data = {
        name: document.getElementById("name").value,
        password: document.getElementById("pass").value
    };

    try {
        // Fetch existing data from the database
        let stdata = await fetch("http://localhost:3000/Admin");
        if (!stdata.ok) {
            throw new Error(`HTTP error! status: ${stdata.status}`);
        }
        let json_store = await stdata.json();

        // Check if the name and password match any record
        let user = json_store.find(user => user.name === data.name && user.password === data.password);

        if (user) {
            console.log("Login successful");
            // Proceed with the POST request if needed
            let response = await fetch("http://localhost:3000/Admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log("Data posted successfully");
        } else {
            console.log("Invalid name or password");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function fetchData() {
    try {
        let stdata = await fetch("http://localhost:3000/Admin");
        if (!stdata.ok) {
            throw new Error(`HTTP error! status: ${stdata.status}`);
        }
        let json_store = await stdata.json();
        console.log(json_store);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();
