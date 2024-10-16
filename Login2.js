// Sign-Up Function
document.querySelector("#signupBox form").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let userData = { name : name, username : username, email : email, password : password };

    let users = JSON.parse(localStorage.getItem("users"));

    const userExists = users.some(user => user.username === username);
    if (userExists) {
        alert("Username already exists. Please choose another.");
        return;
    }
    users.push(userData);

    // Save the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("User signed up successfully!");

    document.querySelector("#signupBox form").reset();
    toggleForms();
});

// Login Function
document.querySelector("#loginBox form").addEventListener("submit", function (event) {
    event.preventDefault();

    let enteredUsername = document.querySelector("#loginBox input[placeholder='Username']").value;
    let enteredPassword = document.querySelector("#loginBox input[placeholder='Password']").value;

    let users = JSON.parse(localStorage.getItem("users"));

    let user = users.find(user => user.username === enteredUsername);

    if (user) {
        if (user.password === enteredPassword) {
            alert("Login successful! Welcome, " + user.name);
            window.location.href = "Index.html";
        } else {
            alert("Incorrect password. Please try again.");
        }
    } else {
        alert("User not found. Please sign up first.");
    }
});

document.getElementById("showSignup").addEventListener("click", toggleForms);
document.getElementById("showLogin").addEventListener("click", toggleForms);
let container = document.querySelector(".container");

function toggleForms() {
    document.getElementById("loginBox").classList.toggle("hidden");
    document.getElementById("signupBox").classList.toggle("hidden");
    container.classList.toggle("signup-active");
}
