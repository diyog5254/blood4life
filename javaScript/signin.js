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

    // Get all users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user
    let user = users.find(function (currentUser) {

        return currentUser.email === email &&
               currentUser.password === password;

    });

    if (user) {

        // Save logged in user
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        alert("Login Successful!");

        // Get previous page
        let previousPage = sessionStorage.getItem("redirectAfterLogin");

        // Admin Login
        if (user.role === "Admin") {

            window.location.href = "adminDashboard.html";

        }

        // Donor Login
        else {

            if (previousPage) {

                sessionStorage.removeItem("redirectAfterLogin");
                window.location.href = previousPage;

            } else {

                window.location.href = "index.html";

            }

        }

    } else {

        alert("Invalid Email or Password.");

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