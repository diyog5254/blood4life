// CREATE DEFAULT ADMIN

let users = JSON.parse(localStorage.getItem("users")) || [];

if (users.length === 0) {

    users.push({

        id: 1,

        fullName: "System Administrator",

        email: "admin@gmail.com",

        password: "admin123",

        role: "Admin",

        phone: "9800000000",

        whatsapp: "9800000000",

        gender: "Male",

        dob: "2000-01-01",

        address: "Kathmandu, Nepal"

    });

    localStorage.setItem("users", JSON.stringify(users));

}

// Show / Hide Password

function togglePassword() {

    let password = document.getElementById("password");
    let button = document.querySelector(".show-btn");

    if (password.type === "password") {

        password.type = "text";
        button.innerText = "Hide";

    } else {

        password.type = "password";
        button.innerText = "Show";

    }

}

// Sign In

document.getElementById("signInForm").addEventListener("submit", function (submitEvent) {

    submitEvent.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(function (currentUser) {

        return currentUser.email === email &&
            currentUser.password === password;

    });

    if (user) {

        localStorage.setItem("loggedInUser", JSON.stringify(user));

        if (user.role === "Admin") {

            showPopup(
                "Welcome Admin",
                "Login Successful",
                "admin/admin-dashboard.html"
            );

        } else {

            showPopup(
                "Welcome",
                "Login Successful",
                "home.html"
            );

        }

    } else {

        showPopup(
            "Login Failed",
            "Invalid Email or Password."
        );

    }

});

// Forgot Password

document.getElementById("forgotPassword").addEventListener("click", function () {

    let email = prompt("Enter your registered email:");

    if (email === null || email.trim() === "") {

        return;

    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(function (currentUser) {

        return currentUser.email === email.trim();

    });

    if (user) {

        alert("Your Password is: " + user.password);

    } else {

        alert("Email not found.");

    }

});

// Hamburger Menu

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".Header nav");

if (menuBtn && nav) {

    menuBtn.addEventListener("click", function () {

        nav.classList.toggle("open");

    });

}