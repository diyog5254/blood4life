// =============================
// Show / Hide Password
// =============================

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

// =============================
// Sign In
// =============================

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

    alert("Login Successful!");

    window.location.href = "home.html";

} else {

    alert("Invalid Email or Password.");

}

});

// =============================
// Forgot Password
// =============================

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

// =============================
// Hamburger Menu
// =============================

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".Header nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
        nav.classList.toggle("open");
    });
}