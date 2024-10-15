// Sign-Up Function
document.querySelector("#signupBox form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userData = { name, username, email, password };

    try {
        const response = await fetch("http://localhost:5000/Admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error("Failed to sign up.");
        }

        alert("User signed up successfully!");
        document.querySelector("#signupBox form").reset();
        toggleForms();
    } catch (error) {
        alert("Error: " + error.message);
    }
});

// Login Function
document.querySelector("#loginBox form").addEventListener("submit", async function (event) {
    event.preventDefault(); 

    const username = document.querySelector("#loginBox input[placeholder='Username']").value;
    const password = document.querySelector("#loginBox input[placeholder='Password']").value;

    try {
        const response = await fetch(`http://localhost:5000/Admin?username=${username}`);
        const users = await response.json(); // Parse JSON response

        if (users.length === 0) {
            alert("User not found!"); 
            return;
        }

        const user = users[0]; // Get the first matching user

        if (user.password === password) {
            alert("Login successful!");
            setTimeout(()=>{
                window.location.href = "Index.html";
            },100)
        } else {
            alert("Invalid password.");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
});

// Toggle between Login and Sign-Up forms
document.getElementById("showSignup").addEventListener("click", toggleForms);
document.getElementById("showLogin").addEventListener("click", toggleForms);

function toggleForms() {
    // Hide or show the login and signup forms
    document.getElementById("loginBox").classList.toggle("hidden");
    document.getElementById("signupBox").classList.toggle("hidden");
}
