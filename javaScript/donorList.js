// ===============================
// ADMIN LOGIN CHECK
// ===============================

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser || loggedInUser.role !== "Admin") {

    alert("Access Denied!");

    window.location.href = "../signin.html";

}


// ===============================
// LOAD DONORS
// ===============================

let donors = JSON.parse(localStorage.getItem("donors")) || [];

const donorTable = document.getElementById("donorTableBody");


displayDonors();

// ===============================
// EDIT DONOR
// ===============================

let editEmail = "";

function editDonor(email) {

    let donor = donors.find(function (donor) {

        return donor.email === email;

    });

    if (!donor) {

        showPopup(
            "Error",
            "Donor not found."
        );

        return;

    }


    editEmail = email;


    document.getElementById("editName").value = donor.fullName;

    document.getElementById("editEmail").value = donor.email;

    document.getElementById("editBloodGroup").value = donor.bloodGroup;

    document.getElementById("editPhone").value = donor.phone;

    document.getElementById("editAddress").value = donor.address;


    document.getElementById("editDonorForm").style.display = "block";

}



// ===============================
// DELETE DONOR
// ===============================

function deleteDonor(email) {

    showConfirm(
        "Delete Donor",
        "Are you sure you want to remove this donor?",
        function () {


            // ===============================
            // REMOVE DONOR
            // ===============================

            donors = donors.filter(function (donor) {

                return donor.email !== email;

            });


            localStorage.setItem(
                "donors",
                JSON.stringify(donors)
            );



            // ===============================
            // RESET DONOR DATA FUNCTION
            // ===============================

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



            // ===============================
            // UPDATE USERS DATA
            // ===============================

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



            // ===============================
            // UPDATE LOGGED IN USER
            // ===============================

            let currentUser = JSON.parse(
                localStorage.getItem("loggedInUser")
            );


            if (currentUser && currentUser.email === email) {

                resetDonorData(currentUser);


                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(currentUser)
                );

            }



            showPopup(
                "Deleted",
                "Donor removed successfully!"
            );


            displayDonors();


        }
    );

}
// ===============================
// UPDATE DONOR
// ===============================

function updateDonor() {

    if (editEmail === "") {

        showPopup(
            "Error",
            "No donor selected."
        );

        return;

    }


    let updatedName = document.getElementById("editName").value;
    let updatedBloodGroup = document.getElementById("editBloodGroup").value;
    let updatedPhone = document.getElementById("editPhone").value;
    let updatedAddress = document.getElementById("editAddress").value;


    // ===============================
    // UPDATE DONOR DATA
    // ===============================

    let donor = donors.find(
        donor => donor.email === editEmail
    );


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


    // ===============================
    // UPDATE USER DATA
    // ===============================

    let users = JSON.parse(localStorage.getItem("users")) || [];


    let user = users.find(
        user => user.email === editEmail
    );


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


    // ===============================
    // UPDATE LOGGED IN USER
    // ===============================

    let currentUser = JSON.parse(
        localStorage.getItem("loggedInUser")
    );


    if (currentUser && currentUser.email === editEmail) {

        currentUser.fullName = updatedName;
        currentUser.bloodGroup = updatedBloodGroup;
        currentUser.phone = updatedPhone;
        currentUser.address = updatedAddress;


        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(currentUser)
        );

    }


    displayDonors();

    closeEditForm();


    showPopup(
        "Updated",
        "Donor information updated successfully!",
        "donor-list.html"
    );

}

// ===============================
// DISPLAY DONORS
// ===============================

function displayDonors() {

    donorTable.innerHTML = "";


    donors.forEach(function (donor) {


        let row = document.createElement("tr");


        row.innerHTML = `

        <td>${donor.fullName}</td>

        <td>${donor.email}</td>

        <td>${donor.bloodGroup}</td>

        <td>${donor.phone}</td>

        <td>${donor.address}</td>

        <td>

    <button onclick="editDonor('${donor.email}')">
        Edit
    </button>


    <button onclick="deleteDonor('${donor.email}')">
        Delete
    </button>

</td>

        `;


        donorTable.appendChild(row);


    });

}



// ===============================
// CLOSE FORM
// ===============================

function closeEditForm() {

    document.getElementById("editDonorForm").style.display = "none";

}


// ===============================
// SEARCH AND FILTER
// ===============================

document.getElementById("searchInput")
    .addEventListener("keyup", filterDonors);


document.getElementById("bloodFilter")
    .addEventListener("change", filterDonors);



function filterDonors() {

    let search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();


    let blood = document
        .getElementById("bloodFilter")
        .value;


    let filtered = donors.filter(function (donor) {


        let nameMatch = donor.fullName
            .toLowerCase()
            .includes(search);


        let bloodMatch =
            blood === "" ||
            donor.bloodGroup === blood;


        return nameMatch && bloodMatch;


    });


    displayFilteredDonors(filtered);

}



// ===============================
// DISPLAY FILTERED DONORS
// ===============================

function displayFilteredDonors(donorList) {

    donorTable.innerHTML = "";


    donorList.forEach(function (donor) {

        let row = document.createElement("tr");


        row.innerHTML = `

        <td>${donor.fullName}</td>
        <td>${donor.email}</td>
        <td>${donor.bloodGroup}</td>
        <td>${donor.phone}</td>
        <td>${donor.address}</td>

        <td>

    <button onclick="editDonor('${donor.email}')">
        Edit
    </button>


    <button onclick="deleteDonor('${donor.email}')">
        Delete
    </button>

</td>

        `;


        donorTable.appendChild(row);

    });

}

// ===============================
// LOGOUT
// ===============================

document.getElementById("logoutBtn")
    .addEventListener("click", function () {

        showConfirm(
            "Logout",
            "Are you sure you want to logout?",
            function () {

                localStorage.removeItem("loggedInUser");

                window.location.href = "../signin.html";

            }
        );

    });
