// ===============================
// ADMIN LOGIN CHECK
// ===============================

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser || loggedInUser.role !== "Admin") {

    alert("Access Denied!");

    window.location.href = "../signin.html";

}

// ===============================
// LOAD REQUESTS
// ===============================

let requests = JSON.parse(localStorage.getItem("requests")) || [];

const tableBody = document.getElementById("requestTableBody");

displayRequests(requests);

// ===============================
// DISPLAY REQUESTS
// ===============================

function displayRequests(requestList) {

    tableBody.innerHTML = "";

    requestList.forEach(function (request) {

        let row = document.createElement("tr");

        row.innerHTML = `

        <td>${request.patientName}</td>

        <td>${request.bloodGroup}</td>

        <td>${request.hospital}</td>

        <td>${request.contact}</td>

        <td>${request.units}</td>

        <td>${request.emergency}</td>

        <td>${request.requestDate}</td>

        <td>${request.status}</td>

        <td>

            <button onclick="approveRequest(${request.requestId})">
                Approve
            </button>

            <button onclick="deleteRequest(${request.requestId})">
                Delete
            </button>

        </td>

        `;

        tableBody.appendChild(row);

    });

}

//Search
document.getElementById("searchInput").addEventListener("keyup", filterRequests);

//blood filter
document.getElementById("bloodFilter").addEventListener("change", filterRequests);

//filter function
function filterRequests() {

    let search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    let blood = document
        .getElementById("bloodFilter")
        .value;

    let filtered = requests.filter(function (request) {

        let nameMatch = request.patientName
            .toLowerCase()
            .includes(search);

        let bloodMatch =
            blood === "All" ||
            request.bloodGroup === blood;

        return nameMatch && bloodMatch;

    });

    displayRequests(filtered);

}



// ===============================
// APPROVE REQUEST
// ===============================

function approveRequest(id) {

    requests.forEach(function (request) {

        if (request.requestId === id) {

            request.status = "Approved";

        }

    });


    localStorage.setItem(
        "requests",
        JSON.stringify(requests)
    );


    showPopup(
        "Success",
        "Blood request approved successfully!"
    );


    displayRequests(requests);

}
// ===============================
// DELETE REQUEST
// ===============================

function deleteRequest(id) {

    showConfirm(
        "Delete Request",
        "Are you sure you want to delete this request?",
        function () {


            requests = requests.filter(function (request) {

                return request.requestId !== id;

            });


            localStorage.setItem(
                "requests",
                JSON.stringify(requests)
            );


            showPopup(
                "Deleted",
                "Request deleted successfully!"
            );


            displayRequests(requests);

        }
    );

}