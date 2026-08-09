// ADMIN LOGIN CHECK

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser || loggedInUser.role !== "Admin") {

    showPopup(
        "Access Denied",
        "You are not authorized to access this page.",
        "../signin.html",
        "error"
    );

}

// LOAD DASHBOARD STATISTICS

let users = JSON.parse(localStorage.getItem("users")) || [];

let donors = JSON.parse(localStorage.getItem("donors")) || [];

let requests = JSON.parse(localStorage.getItem("requests")) || [];

// TOTAL USERS (Exclude Admin)

let totalUsers = users.filter(function (user) {

    return user.role !== "Admin";

}).length;


document.getElementById("totalUsers").textContent = totalUsers;

// TOTAL DONORS

document.getElementById("totalDonors").textContent = donors.length;

// TOTAL REQUESTS

document.getElementById("totalRequests").textContent = requests.length;

// PENDING REQUESTS

let pendingRequests = requests.filter(function (request) {

    return request.status === "Pending";

}).length;


document.getElementById("pendingRequests").textContent = pendingRequests;

// LOAD RECENT DONORS

const donorTable = document.getElementById("recentDonorTable");


donors.slice(-5).reverse().forEach(function (donor) {

    let row = document.createElement("tr");


    row.innerHTML = `

        <td>${donor.fullName || ""}</td>

        <td>${donor.email}</td>

        <td>${donor.bloodGroup}</td>

        <td>${donor.phone}</td>

    `;


    donorTable.appendChild(row);

});

// UPDATE REQUEST STATUS

function updateRequestStatus(index, status) {


    let requests = JSON.parse(localStorage.getItem("requests")) || [];


    requests[index].status = status;


    localStorage.setItem("requests", JSON.stringify(requests));


    showPopup(
        status === "Approved" ? "Success" : "Request Rejected",
        "Request " + status + ".",
        null,
        status === "Approved" ? "success" : "error"
    );


    location.reload();

}