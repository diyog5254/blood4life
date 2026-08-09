// ADMIN LOGIN CHECK

const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (!loggedInUser || loggedInUser.role !== "Admin") {

    showPopup(
        "Access Denied",
        "You are not authorized to access this page.",
        "../signin.html",
        "error"
    );

    throw new Error("Unauthorized access");
}

// LOAD REQUESTS

let requests = JSON.parse(
    localStorage.getItem("requests")
) || [];

const tableBody =
    document.getElementById("requestTableBody");


// Display requests when page loads
displayRequests(requests);

// DISPLAY REQUESTS

function displayRequests(requestList) {

    tableBody.innerHTML = "";


    if (requestList.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="9">
                    No blood requests found.
                </td>
            </tr>
        `;

        return;
    }


    requestList.forEach(function (request) {

        let row = document.createElement("tr");

        // ACTION BUTTONS

        let actionButtons = "";


        if (request.status === "Pending") {

            actionButtons = `

                <button
                    onclick="approveRequest(${request.requestId})">
                    Approve
                </button>

                <button
                    onclick="rejectRequest(${request.requestId})">
                    Reject
                </button>

            `;

        } else if (request.status === "Approved") {

            actionButtons = `
                <span>Approved</span>
            `;

        } else if (request.status === "Rejected") {

            actionButtons = `
                <span>Rejected</span>
            `;

        }


        row.innerHTML = `

            <td>${request.patientName || ""}</td>

            <td>${request.bloodGroup || ""}</td>

            <td>${request.hospital || ""}</td>

            <td>${request.contact || ""}</td>

            <td>${request.units || ""}</td>

            <td>${request.emergency || ""}</td>

            <td>${request.requestDate || ""}</td>

            <td>${request.status || "Pending"}</td>

            <td>
                ${actionButtons}
            </td>

        `;


        tableBody.appendChild(row);

    });

}

// SEARCH

document
    .getElementById("searchInput")
    .addEventListener(
        "keyup",
        filterRequests
    );

// BLOOD FILTER

document
    .getElementById("bloodFilter")
    .addEventListener(
        "change",
        filterRequests
    );

// FILTER REQUESTS

function filterRequests() {

    let search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    let blood =
        document
            .getElementById("bloodFilter")
            .value;


    let filtered =
        requests.filter(function (request) {

            let patientName =
                (request.patientName || "")
                    .toLowerCase();


            let nameMatch =
                patientName.includes(search);


            let bloodMatch =
                blood === "All" ||
                request.bloodGroup === blood;


            return nameMatch && bloodMatch;

        });


    displayRequests(filtered);

}

// APPROVE REQUEST

function approveRequest(id) {

    showConfirm(
        "Approve Request",
        "Are you sure you want to approve this blood request?",
        function () {

            let request =
                requests.find(function (request) {

                    return request.requestId === id;

                });


            if (!request) {

                showPopup(
                    "Error",
                    "Request not found.",
                    null,
                    "error"
                );

                return;

            }


            request.status = "Approved";


            localStorage.setItem(
                "requests",
                JSON.stringify(requests)
            );


            showPopup(
                "Approved",
                "Blood request approved successfully!",
                null,
                "success"
            );


            displayRequests(requests);

        }
    );

}

// REJECT REQUEST
function rejectRequest(id) {

    showConfirm(
        "Reject Request",
        "Are you sure you want to reject this blood request?",
        function () {

            let request =
                requests.find(function (request) {

                    return request.requestId === id;

                });


            if (!request) {

                showPopup(
                    "Error",
                    "Request not found.",
                    null,
                    "error"
                );

                return;

            }


            request.status = "Rejected";


            localStorage.setItem(
                "requests",
                JSON.stringify(requests)
            );


            showPopup(
                "Rejected",
                "Blood request rejected.",
                null,
                "warning"
            );


            displayRequests(requests);

        }
    );

}