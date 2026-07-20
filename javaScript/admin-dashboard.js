// ===============================
// ADMIN LOGIN CHECK
// ===============================

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser || loggedInUser.role !== "Admin") {

    alert("Access Denied!");

    window.location.href = "../signin.html";

}



// ===============================
// LOAD DASHBOARD STATISTICS
// ===============================

let users = JSON.parse(localStorage.getItem("users")) || [];

let donors = JSON.parse(localStorage.getItem("donors")) || [];

let requests = JSON.parse(localStorage.getItem("requests")) || [];


// ===============================
// TOTAL USERS (Exclude Admin)
// ===============================

let totalUsers = users.filter(function(user){

    return user.role !== "Admin";

}).length;


document.getElementById("totalUsers").textContent = totalUsers;


// ===============================
// TOTAL DONORS
// ===============================

document.getElementById("totalDonors").textContent = donors.length;


// ===============================
// TOTAL REQUESTS
// ===============================

document.getElementById("totalRequests").textContent = requests.length;


// ===============================
// PENDING REQUESTS
// ===============================

let pendingRequests = requests.filter(function(request){

    return request.status === "Pending";

}).length;


document.getElementById("pendingRequests").textContent = pendingRequests;


// ===============================
// LOAD RECENT DONORS
// ===============================

const donorTable = document.getElementById("recentDonorTable");


donors.slice(-5).reverse().forEach(function(donor){

    let row = document.createElement("tr");


    row.innerHTML = `

        <td>${donor.name}</td>

        <td>${donor.email}</td>

        <td>${donor.bloodGroup}</td>

        <td>${donor.phone}</td>

    `;


    donorTable.appendChild(row);

});

// ===============================
// LOAD BLOOD REQUESTS
// ===============================

const requestTable = document.getElementById("requestTableBody");


requests.forEach(function(request, index){

    let row = document.createElement("tr");


    row.innerHTML = `

        <td>${request.patientName}</td>

        <td>${request.bloodGroup}</td>

        <td>${request.hospital}</td>

        <td>${request.units}</td>

        <td>${request.status}</td>


        <td>

            <button onclick="updateRequestStatus(${index}, 'Approved')">
                Approve
            </button>


            <button onclick="updateRequestStatus(${index}, 'Rejected')">
                Reject
            </button>

        </td>

    `;


    requestTable.appendChild(row);

});


// ===============================
// UPDATE REQUEST STATUS
// ===============================

function updateRequestStatus(index, status){


    let requests = JSON.parse(localStorage.getItem("requests")) || [];


    requests[index].status = status;


    localStorage.setItem("requests", JSON.stringify(requests));


    alert("Request " + status);


    location.reload();

}
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