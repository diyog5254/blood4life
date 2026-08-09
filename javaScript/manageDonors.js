console.log("manageDonors.js loaded");

console.log(
    "Donors:",
    JSON.parse(localStorage.getItem("donors"))
);// ADMIN LOGIN CHECK

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

// LOAD DONORS

let donors = JSON.parse(
    localStorage.getItem("donors")
) || [];


const donorTable = document.getElementById(
    "donorTableBody"
);


// Display donors when page loads
displayDonors();

// EDIT DONOR

let editEmail = "";


function editDonor(email) {

    let donor = donors.find(function (donor) {

        return donor.email === email;

    });


    if (!donor) {

        showPopup(
            "Error",
            "Donor not found.",
            null,
            "error"
        );

        return;

    }


    editEmail = email;


    document.getElementById("editName").value =
        donor.fullName || "";

    document.getElementById("editEmail").value =
        donor.email || "";

    document.getElementById("editBloodGroup").value =
        donor.bloodGroup || "";

    document.getElementById("editPhone").value =
        donor.phone || "";

    document.getElementById("editAddress").value =
        donor.address || "";


    document.getElementById(
        "editDonorForm"
    ).style.display = "block";

}

// DELETE DONOR

function deleteDonor(email) {

    showConfirm(
        "Delete Donor",
        "Are you sure you want to delete this donor?",
        function () {

            // Remove donor from donors array

            donors = donors.filter(function (donor) {

                return donor.email !== email;

            });


            // Save updated donors

            localStorage.setItem(
                "donors",
                JSON.stringify(donors)
            );

            // UPDATE USERS DATA

            let users = JSON.parse(
                localStorage.getItem("users")
            ) || [];


            users.forEach(function (user) {

                if (user.email === email) {

                    resetDonorData(user);

                }

            });


            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );

            // UPDATE LOGGED IN USER

            let currentUser = JSON.parse(
                localStorage.getItem("loggedInUser")
            );


            if (
                currentUser &&
                currentUser.email === email
            ) {

                resetDonorData(currentUser);


                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(currentUser)
                );

            }


            // Refresh table

            displayDonors();


            showPopup(
                "Deleted",
                "Donor removed successfully!",
                null,
                "success"
            );

        }
    );

}

// RESET DONOR DATA

function resetDonorData(user) {

    user.role = "User";

    user.bloodGroup = "";
    user.phone = "";
    user.whatsapp = "";
    user.address = "";
    user.gender = "";
    user.weight = "";
    user.age = "";
    user.previousDonation = "";

}

// UPDATE DONOR

function updateDonor() {

    if (editEmail === "") {

        showPopup(
            "Error",
            "No donor selected.",
            null,
            "error"
        );

        return;

    }


    let updatedName =
        document.getElementById("editName").value.trim();

    let updatedBloodGroup =
        document.getElementById("editBloodGroup").value;

    let updatedPhone =
        document.getElementById("editPhone").value.trim();

    let updatedAddress =
        document.getElementById("editAddress").value.trim();

    // UPDATE DONOR DATA

    let donor = donors.find(function (donor) {

        return donor.email === editEmail;

    });


    if (donor) {

        donor.fullName = updatedName;
        donor.bloodGroup = updatedBloodGroup;
        donor.phone = updatedPhone;
        donor.address = updatedAddress;

    }


    localStorage.setItem(
        "donors",
        JSON.stringify(donors)
    );

    // UPDATE USERS DATA

    let users = JSON.parse(
        localStorage.getItem("users")
    ) || [];


    let user = users.find(function (user) {

        return user.email === editEmail;

    });


    if (user) {

        user.fullName = updatedName;
        user.bloodGroup = updatedBloodGroup;
        user.phone = updatedPhone;
        user.address = updatedAddress;

    }


    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    // UPDATE LOGGED IN USER

    let currentUser = JSON.parse(
        localStorage.getItem("loggedInUser")
    );


    if (
        currentUser &&
        currentUser.email === editEmail
    ) {

        currentUser.fullName = updatedName;
        currentUser.bloodGroup = updatedBloodGroup;
        currentUser.phone = updatedPhone;
        currentUser.address = updatedAddress;


        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(currentUser)
        );

    }


    // Refresh table

    displayDonors();


    closeEditForm();


    showPopup(
        "Updated",
        "Donor information updated successfully.",
        null,
        "success"
    );

}

// DISPLAY DONORS

function displayDonors() {

    const donorTableBody =
        document.getElementById("donorTableBody");

    donorTableBody.innerHTML = "";

    if (donors.length === 0) {

        donorTableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    No donors registered yet.
                </td>
            </tr>
        `;

        return;
    }


    donors.forEach(function (donor) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${donor.fullName || ""}</td>

            <td>${donor.email || ""}</td>

            <td>${donor.bloodGroup || ""}</td>

            <td>${donor.phone || ""}</td>

            <td>${donor.address || ""}</td>

            <td>
                <button onclick="editDonor('${donor.email}')">
                    Edit
                </button>

                <button onclick="deleteDonor('${donor.email}')">
                    Delete
                </button>
            </td>
        `;

        donorTableBody.appendChild(row);

    });

}
displayDonors();

// CLOSE EDIT FORM

function closeEditForm() {

    document.getElementById(
        "editDonorForm"
    ).style.display = "none";


    editEmail = "";

}

// SEARCH AND FILTER
const searchInput =
    document.getElementById("searchInput");

const bloodFilter =
    document.getElementById("bloodFilter");


if (searchInput) {

    searchInput.addEventListener(
        "keyup",
        filterDonors
    );

}


if (bloodFilter) {

    bloodFilter.addEventListener(
        "change",
        filterDonors
    );

}

// FILTER DONORS

function filterDonors() {

    let search =
        searchInput.value
            .toLowerCase()
            .trim();


    let blood =
        bloodFilter.value;


    let filtered = donors.filter(
        function (donor) {

            let name =
                (donor.fullName || "")
                    .toLowerCase();


            let nameMatch =
                name.includes(search);


            let bloodMatch =
                blood === "" ||
                donor.bloodGroup === blood;


            return nameMatch && bloodMatch;

        }
    );


    displayFilteredDonors(filtered);

}
// DISPLAY FILTERED DONORS

function displayFilteredDonors(donorList) {

    donorTable.innerHTML = "";


    if (donorList.length === 0) {

        donorTable.innerHTML = `
            <tr>
                <td colspan="6">
                    No matching donors found.
                </td>
            </tr>
        `;

        return;

    }


    donorList.forEach(function (donor) {

        let row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${donor.fullName || ""}</td>

            <td>${donor.email || ""}</td>

            <td>${donor.bloodGroup || ""}</td>

            <td>${donor.phone || ""}</td>

            <td>${donor.address || ""}</td>

            <td>

                <button
                    onclick="editDonor('${donor.email}')">
                    Edit
                </button>

                <button
                    onclick="deleteDonor('${donor.email}')">
                    Delete
                </button>

            </td>

        `;


        donorTable.appendChild(row);

    });

}