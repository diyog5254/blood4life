// ADMIN LOGIN CHECK

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser || loggedInUser.role !== "Admin") {

    alert("Access Denied!");

    window.location.href = "../signin.html";

}

// Get Users

let users = JSON.parse(localStorage.getItem("users")) || [];

// Donors Only
let donors = users.filter(function (user) {

    return user.role === "Donor";

});

// Dashboard Cards

document.getElementById("totalDonors").innerText = donors.length;

document.getElementById("totalUsers").innerText = users.length;

// Static value for now
document.getElementById("totalRequests").innerText = 0;

// Recent Donor Table

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

// Logout
document.getElementById("logoutBtn").addEventListener("click", function () {


    let confirmLogout = confirm("Are you sure you want to logout?");


    showConfirm(
        "Logout",
        "Are you sure you want to logout?",
        function () {

            localStorage.removeItem("loggedInUser");

            showPopup(
                "Logged Out",
                "You have been logged out successfully.",
                "signin.html"
            );

        }
    );


});