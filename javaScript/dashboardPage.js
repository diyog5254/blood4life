// Get Logged-in User

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {

    window.location.href = "signin.html";

}

if (loggedInUser.role === "Admin") {

    window.location.href = "admin/admin-dashboard.html";

}


document.getElementById("profileBlood").textContent =
loggedInUser.bloodGroup;

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

// Check Login
if (!loggedInUser) {

    alert("Please sign in first.");

    window.location.href = "signin.html";

}

// if already a donor it hides became donor button
const donorAction = document.getElementById("donorAction");

if (loggedInUser.role === "Donor") {

    donorAction.innerHTML = `
        <p style="color:green;font-weight:bold;">
            ✅ You are already a registered donor.
        </p>
    `;

}

// Show Welcome Message
document.getElementById("userName").textContent =
    loggedInUser.fullname || "User";


    // ===============================
// DASHBOARD STATISTICS
// ===============================

let donors = JSON.parse(localStorage.getItem("donors")) || [];

let requests = JSON.parse(localStorage.getItem("requests")) || [];

document.getElementById("totalDonors").textContent = donors.length;

document.getElementById("totalRequests").textContent = requests.length;

document.getElementById("userRole").textContent =
    loggedInUser.role || "User";

document.getElementById("userBlood").textContent =
    loggedInUser.bloodGroup || "-";



// Show Profile
document.getElementById("profileName").textContent =
    loggedInUser.fullname || "-";

document.getElementById("profileEmail").textContent =
    loggedInUser.email || "-";

document.getElementById("profilePhone").textContent =
    loggedInUser.phone || "Not Available";

document.getElementById("profileBlood").textContent =
    loggedInUser.bloodGroup || "Not Registered";

    
// ===============================
// DONATION STATUS
// ===============================

if (loggedInUser.role === "Donor") {

    if (loggedInUser.previousDonation === "") {

        document.getElementById("donationStatus").textContent =
            "Eligible";

        document.getElementById("lastDonation").textContent =
            "No Previous Donation";

        document.getElementById("nextDonation").textContent =
            "Available";

    } else {

        document.getElementById("donationStatus").textContent =
            "Registered Donor";

        document.getElementById("lastDonation").textContent =
            loggedInUser.previousDonation;

        document.getElementById("nextDonation").textContent =
            "Check Eligibility";

    }

} else {

    document.getElementById("donationStatus").textContent =
        "Not Registered";

}

// Logout
document.getElementById("logoutBtn").addEventListener("click", function () {

    localStorage.removeItem("loggedInUser");

    alert("Logged Out Successfully");

    window.location.href = "signin.html";

});


// ===============================
// RECENT ACTIVITIES
// ===============================

const activityList = document.getElementById("activityList");

activityList.innerHTML = "";

// Account
activityList.innerHTML += `
<li>✅ Account Created</li>
`;

// Donor
if (loggedInUser.role === "Donor") {

    activityList.innerHTML += `
    <li>🩸 Registered as Blood Donor</li>
    `;

}

// Blood Request
let requests = JSON.parse(localStorage.getItem("requests")) || [];

let myRequests = requests.filter(function(request){

    return request.userId === loggedInUser.id;

});

if(myRequests.length > 0){

    activityList.innerHTML += `
    <li>📋 Blood Request Submitted</li>
    `;

}