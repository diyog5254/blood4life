// Show / Hide Password

function togglePassword(checkbox, inputId) {

    let input = document.getElementById(inputId);

    if (checkbox.checked) {
        input.type = "text";
    } else {
        input.type = "password";
    }

}

// CREATE DEFAULT ADMIN

let users = JSON.parse(localStorage.getItem("users")) || [];


// Check Admin already exists

let adminExist = users.find(function (user) {

    return user.role === "Admin";

});

// Sign Up

document.getElementById("signupForm").addEventListener("submit", function (submitEvent) {

    submitEvent.preventDefault();

    let fullName = document.getElementById("fullname").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let message = document.getElementById("message");

    // Password Match

    if (password !== confirmPassword) {

        message.style.color = "red";
        message.innerText = "Passwords do not match.";

        return;

    }

    // Get Users

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check Duplicate Email

    let emailExists = users.find(function (user) {

        return user.email === email;

    });

    if (emailExists) {

        message.style.color = "red";
        message.innerText = "Email already exists.";

        return;

    }

    // Create User

    let newUser = {

        id: Date.now(),

        fullName: fullName,

        email: email,

        password: password,

        role: "User"

    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    message.style.color = "green";
    message.innerText = "Account created successfully.";

    document.getElementById("signupForm").reset();

    setTimeout(function () {

        window.location.href = "signin.html";

    }, 2000);

});