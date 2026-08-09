// LOGIN CHECK

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {

    // Role update
    const userRole = document.getElementById("userRole");

    if (userRole) {
        userRole.innerText = loggedInUser.role || "User";
    }


    // Blood group update
    const userBlood = document.getElementById("userBlood");

    if (userBlood) {
        userBlood.innerText = loggedInUser.bloodGroup || "-";
    }

}

// CHECK DONOR STATUS

const donors = JSON.parse(localStorage.getItem("donors")) || [];


let donor = null;

if (loggedInUser) {

    donor = donors.find(function (item) {

        return item.userId == loggedInUser.id ||
            item.email === loggedInUser.email;

    });

}

// QUICK ACTION - BECOME DONOR

const quickDonorBtn =
    document.querySelector('.action-btn[href="donor-form.html"]');

if (quickDonorBtn) {

    quickDonorBtn.addEventListener("click", function (event) {

        // LOGIN CHECK

        if (!loggedInUser) {

            event.preventDefault();

            showPopup(
                "Login Required",
                "Please sign in first to become a donor.",
                "signin.html",
                "warning"
            );

            return;
        }


        // ALREADY DONOR CHECK

        if (donor) {

            event.preventDefault();

            showPopup(
                "Already a Donor",
                "You have already registered as a blood donor.",
                "dashboardPage.html",
                "warning"
            );

            return;
        }

        // If user is not donor,
        // donor-form.html opens normally.

    });

}

// BECOME DONOR BUTTON

const donorBtn = document.querySelector(".donate-btn");

const requestBtn = document.getElementById("requestBtn");


if (requestBtn) {


    requestBtn.addEventListener("click", function (event) {


        if (!loggedInUser) {

            event.preventDefault();

            showPopup(
                "Login Required",
                "Please sign in first.",
                "signin.html",
                "warning"
            );

        }


    });


}

// DASHBOARD PROFILE INFO

if (donor) {

    document.getElementById("profileName").innerText =
        donor.fullName;

    document.getElementById("profileEmail").innerText =
        donor.email;

    document.getElementById("profileBlood").innerText =
        donor.bloodGroup;

    document.getElementById("profilePhone").innerText =
        donor.phone;

}
else {

    document.getElementById("profileName").innerText =
        loggedInUser.fullName;

    document.getElementById("profileEmail").innerText =
        loggedInUser.email;

}

//DONATION STATUS
const donationStatus = document.getElementById("donationStatus");
const lastDonation = document.getElementById("lastDonation");
const nextDonation = document.getElementById("nextDonation");


if (loggedInUser) {

    if (donor) {

        donationStatus.innerText = donor.status || "Available";

        lastDonation.innerText = donor.lastDonation || "-";

        nextDonation.innerText = donor.nextDonation || "-";

    }
    else {

        donationStatus.innerText = "Not Available";

        lastDonation.innerText = "-";

        nextDonation.innerText = "-";

    }

}