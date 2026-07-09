// =======================================
// Check Admin Login
// =======================================

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {

    alert("Please Sign In First!");
    window.location.href = "../signin.html";

}

if (loggedInUser.role !== "Admin") {

    alert("Access Denied!");
    window.location.href = "../home.html";

}

// =======================================
// Get Users
// =======================================

let users = JSON.parse(localStorage.getItem("users")) || [];

let donors = users.filter(function (user) {

    return user.role === "Donor";

});

// =======================================
// Display Donors
// =======================================

function displayDonors(donorList) {

    let table = document.getElementById("donorTable");

    table.innerHTML = "";

    if (donorList.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="6">No Donors Found</td>

            </tr>

        `;

        return;

    }

    donorList.forEach(function (donor) {

        table.innerHTML += `

            <tr>

                <td>${donor.id}</td>

                <td>${donor.fullName}</td>

                <td>${donor.email}</td>

                <td>${donor.bloodGroup || "N/A"}</td>

                <td>${donor.phone || "N/A"}</td>

                <td>

                    <button class="action-btn edit-btn"
                    onclick="editDonor(${donor.id})">

                        Edit

                    </button>

                    <button class="action-btn delete-btn"
                    onclick="deleteDonor(${donor.id})">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}

displayDonors(donors);

// =======================================
// Search
// =======================================

document.getElementById("searchInput").addEventListener("keyup", function () {

    let keyword = this.value.toLowerCase();

    let filtered = donors.filter(function (donor) {

        return donor.fullName.toLowerCase().includes(keyword);

    });

    displayDonors(filtered);

});

// =======================================
// Delete
// =======================================

function deleteDonor(id) {

    let confirmDelete = confirm("Delete this donor?");

    if (!confirmDelete) return;

    users = users.filter(function (user) {

        return user.id !== id;

    });

    localStorage.setItem("users", JSON.stringify(users));

    donors = users.filter(function (user) {

        return user.role === "Donor";

    });

    displayDonors(donors);

}

// =======================================
// Edit
// =======================================

function editDonor(id) {

    let donor = users.find(function (user) {

        return user.id === id;

    });

    if (!donor) return;

    let newName = prompt("Full Name", donor.fullName);

    if (newName !== null && newName.trim() !== "") {

        donor.fullName = newName;

    }

    let newEmail = prompt("Email", donor.email);

    if (newEmail !== null && newEmail.trim() !== "") {

        donor.email = newEmail;

    }

    localStorage.setItem("users", JSON.stringify(users));

    donors = users.filter(function (user) {

        return user.role === "Donor";

    });

    displayDonors(donors);

}

// =======================================
// Logout
// =======================================

function logout() {

    localStorage.removeItem("loggedInUser");

    alert("Logged Out Successfully!");

    window.location.href = "../signin.html";

}