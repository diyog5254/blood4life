// LOGIN CHECK

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {

    showPopup(
        "Login Required",
        "Please sign in first.",
        "signin.html",
        "warning"
    );

}

if (!loggedInUser) {

    showPopup(
        "Login Required",
        "Please sign in first to become a donor.",
        "signin.html",
        "warning"
    );

    throw new Error("User not logged in");
}

let donors = JSON.parse(localStorage.getItem("donors")) || [];

const alreadyDonor = donors.find(function (donor) {

    return donor.email === loggedInUser.email;

});

if (alreadyDonor) {

    showPopup(
        "Already a Donor",
        "You are already registered as a blood donor.",
        "dashboardPage.html",
        "info"
    );

    throw new Error("User is already a donor");

}

let editDonorId = localStorage.getItem("editDonorId");
let users = JSON.parse(localStorage.getItem("users")) || [];

// AUTO FILL NAME & EMAIL

document.getElementById("name").value = loggedInUser.fullName;

document.getElementById("email").value = loggedInUser.email;


// EDIT DONOR AUTO FILL

if (editDonorId) {

    // let donors = JSON.parse(localStorage.getItem("donors")) || [];

    let donor = donors.find(function (d) {
        return d.userId == editDonorId;
    });

    if (donor) {

        document.getElementById("name").value = donor.fullName;
        document.getElementById("email").value = donor.email;
        document.getElementById("dob").value = donor.dob;
        document.getElementById("weight").value = donor.weight;
        document.getElementById("blood").value = donor.bloodGroup;
        document.getElementById("phone").value = donor.phone;
        document.getElementById("whatsapp").value = donor.whatsapp;
        document.getElementById("address").value = donor.address;
        document.getElementById("previousDonation").value = donor.previousDonation;

        document.querySelector(
            `input[name="gender"][value="${donor.gender}"]`
        ).checked = true;

        document.getElementById("name").readOnly = true;
        document.getElementById("email").readOnly = true;
        document.getElementById("dob").readOnly = true;

        document.getElementById("blood").style.pointerEvents = "none";
        document.getElementById("blood").style.backgroundColor = "#eee";

    }

}

// DONOR FORM

document.getElementById("donorForm").addEventListener("submit", function (event) {

    event.preventDefault();


    let donors = JSON.parse(localStorage.getItem("donors")) || []
    let dob = document.getElementById("dob").value;
    let weight = Number(document.getElementById("weight").value);
    let blood = document.getElementById("blood").value;
    let phone = document.getElementById("phone").value.trim();
    let whatsapp = document.getElementById("whatsapp").value.trim();
    let address = document.getElementById("address").value.trim();
    let previousDonation = document.getElementById("previousDonation").value;

    let gender = document.querySelector('input[name="gender"]:checked');


    if (!gender) {

        showPopup(
            "Validation Error",
            "Please select gender.",
            null,
            "warning"
        );

        return;

    }

    // AGE VALIDATION

    let birthDate = new Date(dob);

    let today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    let month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {

        age--;

    }

    if (age < 18) {
        showPopup(
            "Age Requirement",
            "You must be at least 18 years old.",
            null,
            "warning"
        );
        return;

    }

    // WEIGHT VALIDATION

    if (weight < 45) {
        showPopup(
            "Weight Requirement",
            "Minimum weight must be 45 kg.",
            null,
            "warning"
        );
        return;
    }

    // PREVIOUS DONATION VALIDATION

    if (previousDonation !== "") {

        let lastDonation = new Date(previousDonation);

        let difference = today - lastDonation;

        let days = difference / (1000 * 60 * 60 * 24);

        if (days < 90) {
            showPopup(
                "Donation Interval",
                "Blood can only be donated after 90 days.",
                null,
                "warning"
            );
            return;

        }

    }

    // DUPLICATE DONOR CHECK

    let alreadyDonor = donors.find(function (donor) {

        return donor.userId === loggedInUser.id;

    });

    if (alreadyDonor && !editDonorId) {

        showPopup(
            "Information",
            "You are already registered as a donor.",
            null,
            "info"
        );

        return;

    }

    // SAVE DONOR

    let newDonor = {

        donorId: Date.now(),

        userId: loggedInUser.id,

        fullName: document.getElementById("name").value.trim(),

        email: document.getElementById("email").value.trim(),

        dob: dob,

        age: age,

        weight: weight,

        gender: gender.value,

        bloodGroup: blood,

        previousDonation: previousDonation,

        phone: phone,

        whatsapp: whatsapp,

        address: address,

        status: "Active"

    };



    if (editDonorId) {

        let index = donors.findIndex(function (d) {

            return d.userId == editDonorId;

        });


        if (index !== -1) {

            donors[index] = newDonor;

        }


        localStorage.removeItem("editDonorId");

    } else {

        donors.push(newDonor);

    }

    localStorage.setItem("donors", JSON.stringify(donors));

    // UPDATE USER ROLE

    users.forEach(function (user) {

        if (user.email === loggedInUser.email) {

            user.role = "Donor";

            user.dob = dob;

            user.age = age;

            user.weight = weight;

            user.gender = gender.value;

            user.bloodGroup = blood;

            user.previousDonation = previousDonation;

            user.phone = phone;

            user.whatsapp = whatsapp;

            user.address = address;

        }

    });

    localStorage.setItem("users", JSON.stringify(users));

    // UPDATE LOGGED USER

    loggedInUser.role = "Donor";
    loggedInUser.fullName = loggedInUser.fullName || loggedInUser.name;

    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(loggedInUser)
    );

    loggedInUser.dob = dob;

    loggedInUser.age = age;

    loggedInUser.weight = weight;

    loggedInUser.gender = gender.value;

    loggedInUser.bloodGroup = blood;

    loggedInUser.previousDonation = previousDonation;

    loggedInUser.phone = phone;

    loggedInUser.whatsapp = whatsapp;

    loggedInUser.address = address;

    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    // SUCCESS

    if (editDonorId) {

        showPopup(
            "Success!",
            "Donor information updated successfully.",
            "admin/donorList.html"
        );

    } else {

        showPopup(
            "Congratulations!",
            "You are now a registered Blood Donor.",
            "profile.html"
        );

    }

});

// MOBILE MENU

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".Header nav");

if (menuBtn) {

    menuBtn.addEventListener("click", function () {

        nav.classList.toggle("open");

    });

}