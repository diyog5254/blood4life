// =============================
// Check Login
// =============================

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {

    alert("Please Sign In First!");

    window.location.href = "signin.html";

}

// =============================
// Display User Information
// =============================

document.getElementById("userName").innerText =
    loggedInUser.fullName || "Not Available";

document.getElementById("userEmail").innerText =
    loggedInUser.email || "Not Available";

document.getElementById("userRole").innerText =
    loggedInUser.role || "Donor";

document.getElementById("userPhone").innerText =
    loggedInUser.phone || "Not Added";

document.getElementById("userBlood").innerText =
    loggedInUser.bloodGroup || "Not Added";

document.getElementById("userAge").innerText =
    loggedInUser.age || "Not Added";

document.getElementById("userGender").innerText =
    loggedInUser.gender || "Not Added";

document.getElementById("userAddress").innerText =
    loggedInUser.address || "Not Added";

// =============================
// Logout
// =============================

function logout() {

    localStorage.removeItem("loggedInUser");

    alert("Logged Out Successfully!");

    window.location.href = "signin.html";

}

// =============================
// Responsive Navbar
// =============================

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".Header nav");

if (menuBtn && nav) {

    menuBtn.addEventListener("click", function () {

        nav.classList.toggle("open");

    });

}