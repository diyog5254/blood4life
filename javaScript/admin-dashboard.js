// ===============================
// ADMIN LOGIN CHECK
// ===============================

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser || loggedInUser.role !== "Admin") {

    alert("Access Denied!");

    window.location.href = "../signin.html";

}

// ===============================
// GET DATA
// ===============================

const users = JSON.parse(localStorage.getItem("users")) || [];

const donors = JSON.parse(localStorage.getItem("donors")) || [];

const requests = JSON.parse(localStorage.getItem("requests")) || [];

// ===============================
// COUNT DATA
// ===============================

const totalUsers = users.filter(function (user) {

    return user.role !== "Admin";

}).length;

const totalDonors = donors.length;

const totalRequests = requests.length;

const pendingRequests = requests.filter(function (request) {

    return request.status === "Pending";

}).length;

// ===============================
// DISPLAY
// ===============================

document.getElementById("totalUsers").textContent = totalUsers;

document.getElementById("totalDonors").textContent = totalDonors;

document.getElementById("totalRequests").textContent = totalRequests;

document.getElementById("pendingRequests").textContent = pendingRequests;

// ===============================
// LOGOUT
// ===============================

document.getElementById("logoutBtn").addEventListener("click", function () {

    let confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {

        localStorage.removeItem("loggedInUser");

        window.location.href = "../signin.html";

    }

});