// ===============================
// LOGIN CHECK
// ===============================

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser || loggedInUser.role !== "Admin") {

    alert("Access Denied!");

    window.location.href = "../signin.html";

}

// ===============================
// LOAD DONORS
// ===============================

let donors = JSON.parse(localStorage.getItem("donors")) || [];

let tableBody = document.getElementById("donorTableBody");

tableBody.innerHTML = "";

donors.forEach(function (donor) {

    tableBody.innerHTML += `

    <tr>

        <td>${donor.fullName}</td>

        <td>${donor.email}</td>

        <td>${donor.bloodGroup}</td>

        <td>${donor.phone}</td>

        <td>${donor.address}</td>

        <td>

            <button onclick="deleteDonor(${donor.userId})">

                Delete

            </button>

        </td>

    </tr>

    `;

});

// ===============================
// DELETE DONOR
// ===============================

function deleteDonor(userId) {

    showConfirm(

        "Delete Donor",

        "Are you sure you want to delete this donor?",

        function () {

            let donors = JSON.parse(localStorage.getItem("donors")) || [];

            donors = donors.filter(function (donor) {

                return donor.userId !== userId;

            });

            localStorage.setItem("donors", JSON.stringify(donors));

            let users = JSON.parse(localStorage.getItem("users")) || [];

            users.forEach(function (user) {

                if (user.id === userId) {

                    user.role = "User";

                }

            });

            localStorage.setItem("users", JSON.stringify(users));

            location.reload();

        }

    );

    let donors = JSON.parse(localStorage.getItem("donors")) || [];

    donors = donors.filter(function (donor) {

        return donor.userId !== userId;

    });

    localStorage.setItem("donors", JSON.stringify(donors));

    // Update role in users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.forEach(function (user) {

        if (user.id === userId) {

            user.role = "User";

        }

    });

    localStorage.setItem("users", JSON.stringify(users));

    location.reload();

}