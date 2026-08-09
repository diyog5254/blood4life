// LOGIN CHECK

const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);


const requestTableBody =
    document.getElementById("requestTableBody");


if (!loggedInUser) {

    showPopup(
        "Login Required",
        "Please sign in first.",
        "signin.html",
        "warning"
    );

} else {

    loadMyRequests();

}

// LOAD MY REQUESTS
function loadMyRequests() {

    const requests =
        JSON.parse(
            localStorage.getItem("requests")
        ) || [];


    const myRequests =
        requests.filter(function (request) {

            return request.email === loggedInUser.email;

        });


    console.log("My Requests:", myRequests);


    requestTableBody.innerHTML = "";

    // NO REQUEST

    if (myRequests.length === 0) {

        requestTableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    No blood requests found.
                </td>
            </tr>
        `;

        return;

    }

    // DISPLAY REQUESTS
    myRequests.forEach(function (request) {

        requestTableBody.innerHTML += `

            <tr>

                <td>
                    ${request.patientName || ""}
                </td>

                <td>
                    ${request.bloodGroup || ""}
                </td>

                <td>
                    ${request.hospital || request.hospitalName || ""}
                </td>

                <td>
                    ${request.units || ""}
                </td>

                <td>
                    ${request.status || "Pending"}
                </td>

            </tr>

        `;

    });

}