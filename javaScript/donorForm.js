// LOGIN CHECK
const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {

    showPopup(
        "Login Required",
        "Please sign in first.",
        "signin.html",
        "warning"
    );

    throw new Error("User is not logged in.");

}

// CHECK ALREADY DONOR

const donors =
    JSON.parse(localStorage.getItem("donors")) || [];

const existingDonor = donors.find(function (donor) {

    return donor.email === loggedInUser.email;

});


// If already donor → stop everything

if (existingDonor) {

    showPopup(
        "Already a Donor",
        "You have already registered as a blood donor.",
        "dashboardPage.html",
        "warning"
    );

    throw new Error("User is already a donor.");

}

// AUTO FILL USER INFORMATION

document.getElementById("fullName").value =
    loggedInUser.fullName || "";

document.getElementById("email").value =
    loggedInUser.email || "";

document.getElementById("phone").value =
    loggedInUser.phone || "";

document.getElementById("whatsapp").value =
    loggedInUser.whatsapp || "";

document.getElementById("address").value =
    loggedInUser.address || "";

// DONOR FORM

const donorForm =
    document.getElementById("donorForm");


donorForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // GET FORM VALUES

    const dob =
        document.getElementById("dob").value;

    const weight =
        document.getElementById("weight").value;

    const gender =
        document.querySelector(
            'input[name="gender"]:checked'
        )?.value;

    const bloodGroup =
        document.getElementById("blood").value;

    const previousDonation =
        document.getElementById("previousDonation").value;

    const phone =
        document.getElementById("phone").value;

    const whatsapp =
        document.getElementById("whatsapp").value;

    const address =
        document.getElementById("address").value;


    // ======================================
    // CHECK DOB
    // ======================================

    if (!dob) {

        showPopup(
            "Invalid Date",
            "Please enter your date of birth.",
            null,
            "warning"
        );

        return;
    }

    // CHECK AGE

    const birthDate = new Date(dob);
    const today = new Date();

    let age =
        today.getFullYear() -
        birthDate.getFullYear();

    const monthDifference =
        today.getMonth() -
        birthDate.getMonth();

    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() < birthDate.getDate()
        )
    ) {
        age--;
    }


    if (age < 18) {

        showPopup(
            "Not Eligible",
            "You must be at least 18 years old to become a donor.",
            null,
            "warning"
        );

        return;
    }

    // CHECK WEIGHT

    if (Number(weight) < 45) {

        showPopup(
            "Not Eligible",
            "Your weight must be at least 45 kg.",
            null,
            "warning"
        );

        return;
    }

    // CHECK PREVIOUS DONATION

    if (previousDonation) {

        const lastDonation =
            new Date(previousDonation);

        const difference =
            today - lastDonation;

        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        if (days < 90) {

            showPopup(
                "Not Eligible",
                "At least 90 days must have passed since your previous donation.",
                null,
                "warning"
            );

            return;
        }
    }

    // GET USERS

    const users =
        JSON.parse(localStorage.getItem("users")) || [];

    // GET DONORS AGAIN

    const donors =
        JSON.parse(localStorage.getItem("donors")) || [];

    // FINAL DUPLICATE CHECK

    const alreadyDonor =
        donors.find(function (donor) {

            return donor.email === loggedInUser.email;

        });


    if (alreadyDonor) {

        showPopup(
            "Already a Donor",
            "You have already registered as a blood donor.",
            "dashboardPage.html",
            "warning"
        );

        return;
    }

    // CREATE DONOR

    const newDonor = {

        id: Date.now(),

        fullName: loggedInUser.fullName,

        email: loggedInUser.email,

        dob: dob,

        age: age,

        weight: Number(weight),

        gender: gender,

        bloodGroup: bloodGroup,

        previousDonation: previousDonation,

        phone: phone,

        whatsapp: whatsapp,

        address: address,

        role: "Donor"

    };

    // SAVE DONOR

    donors.push(newDonor);

    localStorage.setItem(
        "donors",
        JSON.stringify(donors)
    );

    // UPDATE USER ROLE

    users.forEach(function (user) {

        if (user.id === loggedInUser.id) {

            user.role = "Donor";

            user.dob = dob;
            user.age = age;
            user.weight = Number(weight);
            user.gender = gender;
            user.bloodGroup = bloodGroup;
            user.previousDonation = previousDonation;
            user.phone = phone;
            user.whatsapp = whatsapp;
            user.address = address;

        }

    });


    // Save updated users

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    // UPDATE LOGGED-IN USER

    loggedInUser.role = "Donor";

    loggedInUser.dob = dob;
    loggedInUser.age = age;
    loggedInUser.weight = Number(weight);
    loggedInUser.gender = gender;
    loggedInUser.bloodGroup = bloodGroup;
    loggedInUser.previousDonation = previousDonation;
    loggedInUser.phone = phone;
    loggedInUser.whatsapp = whatsapp;
    loggedInUser.address = address;


    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(loggedInUser)
    );

    // SUCCESS

    showPopup(
        "Registration Successful",
        "You have successfully registered as a blood donor.",
        "dashboardPage.html",
        "success"
    );

});

// MOBILE MENU

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".Header nav");

if (menuBtn) {

    menuBtn.addEventListener("click", function () {

        nav.classList.toggle("open");

    });

}