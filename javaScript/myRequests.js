const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

const requests = JSON.parse(localStorage.getItem("requests")) || [];

const myRequests = requests.filter(function(request){

    return request.email === loggedInUser.email;

});

console.log(myRequests);

if (myRequests.length === 0) {

    requestTableBody.innerHTML = `
        <tr>
            <td colspan="5">
                No blood requests found.
            </td>
        </tr>
    `;

}
else {

    myRequests.forEach(function (request) {

        requestTableBody.innerHTML += `

        <tr>

            <td>${request.patientName}</td>

            <td>${request.bloodGroup}</td>

            <td>${request.hospitalName}</td>

            <td>${request.units}</td>

            <td>${request.status}</td>

        </tr>

        `;

    });

}