// ===============================
// LOGIN CHECK
// ===============================

document.getElementById("dashboardBtn").addEventListener("click", function () {

    if (loggedInUser.role === "Admin") {

        window.location.href = "admin/admin-dashboard.html";

    } else {

        window.location.href = "dashboardpage.html";

    }

});

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {

    alert("Please Sign In First!");

    window.location.href = "signin.html";

}


// ===============================
// GET DONOR INFORMATION
// ===============================

const donors = JSON.parse(localStorage.getItem("donors")) || [];

const donor = donors.find(function (item) {

    return item.userId === loggedInUser.id;

});

// ===============================
// BASIC INFORMATION
// ===============================

document.getElementById("profileName").textContent =
    loggedInUser.fullName || "-";

document.getElementById("profileEmail").textContent =
    loggedInUser.email || "-";

document.getElementById("profileRole").textContent =
    loggedInUser.role || "User";

// ===============================
// PERSONAL INFORMATION
// ===============================

document.getElementById("profilePhone").textContent =
    donor ? donor.phone : "Not Available";

document.getElementById("profileAddress").textContent =
    donor ? donor.address : "Not Available";

document.getElementById("profileGender").textContent =
    donor ? donor.gender : "-";

document.getElementById("profileAge").textContent =
    donor ? donor.age : "-";

// ===============================
// DONATION INFORMATION
// ===============================

document.getElementById("profileBlood").textContent =
    donor ? donor.bloodGroup : "Not Registered";

document.getElementById("profileWeight").textContent =
    donor ? donor.weight : "-";

document.getElementById("profileDonation").textContent =
    donor
        ? (donor.previousDonation || "First Time Donor")
        : "Not Registered";



console.log("Logged User:", loggedInUser);

console.log("Donors:", donors);

console.log("Matched Donor:", donor);

// ===============================
// STATUS
// ===============================

if (donor) {

    document.getElementById("profileStatus").textContent =
        "Eligible Donor";

} else {

    document.getElementById("profileStatus").textContent =
        "Not Registered";

}

// ===============================
// DASHBOARD REDIRECT
// ===============================

document.getElementById("dashboardBtn").addEventListener("click", function (event) {

    event.preventDefault();

    if (loggedInUser.role === "Admin") {

        window.location.href = "admin/admin-dashboard.html";

    } else {

        window.location.href = "dashboardpage.html";

    }

});

// ===============================
// LOGOUT
// ===============================

document.getElementById("logoutBtn").addEventListener("click", function () {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("loggedInUser");

        window.location.href = "signin.html";

    }

});