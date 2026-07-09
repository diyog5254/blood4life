// =======================================
// Check Admin Login
// =======================================

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {

    alert("Please Sign In First!");

    window.location.href = "../signin.html";

}

if (loggedInUser.role !== "Admin") {

    alert("Access Denied!");

    window.location.href = "../home.html";

}

// =======================================
// Get Users
// =======================================

let users = JSON.parse(localStorage.getItem("users")) || [];

// Donors Only
let donors = users.filter(function (user) {

    return user.role === "Donor";

});

// =======================================
// Dashboard Cards
// =======================================

document.getElementById("totalDonors").innerText = donors.length;

document.getElementById("totalUsers").innerText = users.length;

// Static value for now
document.getElementById("totalRequests").innerText = 0;

// =======================================
// Recent Donor Table
// =======================================

let donorTable = document.getElementById("donorTable");

donors.forEach(function (donor) {

    let row = `

        <tr>

            <td>${donor.fullName}</td>

            <td>${donor.email}</td>

            <td>${donor.bloodGroup || "N/A"}</td>

        </tr>

    `;

    donorTable.innerHTML += row;

});

// =======================================
// Logout
// =======================================

function logout() {

    localStorage.removeItem("loggedInUser");

    alert("Logged Out Successfully!");

    window.location.href = "../signin.html";

}