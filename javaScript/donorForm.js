// ===============================
// LOGIN CHECK
// ===============================

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {

    alert("Please Sign In First!");

    window.location.href = "signin.html";

}

// ===============================
// AUTO FILL NAME & EMAIL
// ===============================

document.getElementById("name").value = loggedInUser.fullName;

document.getElementById("email").value = loggedInUser.email;

// ===============================
// DONOR FORM
// ===============================

document.getElementById("donorForm").addEventListener("submit", function (event) {

    event.preventDefault();

    let dob = document.getElementById("dob").value;
    let weight = Number(document.getElementById("weight").value);
    let blood = document.getElementById("blood").value;
    let phone = document.getElementById("phone").value.trim();
    let whatsapp = document.getElementById("whatsapp").value.trim();
    let address = document.getElementById("address").value.trim();
    let previousDonation = document.getElementById("previousDonation").value;

    let gender = document.querySelector('input[name="gender"]:checked');

    // ===============================
    // AGE VALIDATION
    // ===============================

    let birthDate = new Date(dob);

    let today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    let month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {

        age--;

    }

    if (age < 18) {

        alert("You must be at least 18 years old.");

        return;

    }

    // ===============================
    // WEIGHT VALIDATION
    // ===============================

    if (weight < 45) {

        alert("Minimum weight must be 45 kg.");

        return;

    }

    // ===============================
    // PREVIOUS DONATION VALIDATION
    // ===============================

    if (previousDonation !== "") {

        let lastDonation = new Date(previousDonation);

        let difference = today - lastDonation;

        let days = difference / (1000 * 60 * 60 * 24);

        if (days < 90) {

            alert("Blood can only be donated after 90 days.");

            return;

        }

    }

    // ===============================
    // DUPLICATE DONOR CHECK
    // ===============================

    let donors = JSON.parse(localStorage.getItem("donors")) || [];

    let alreadyDonor = donors.find(function (donor) {

        return donor.userId === loggedInUser.id;

    });

    if (alreadyDonor) {

        alert("You are already registered as a donor.");

        window.location.href = "profile.html";

        return;

    }

    // ===============================
    // SAVE DONOR
    // ===============================

    let newDonor = {

        userId: loggedInUser.id,

        fullName: loggedInUser.fullName,

        email: loggedInUser.email,

        dob: dob,

        age: age,

        weight: weight,

        gender: gender.value,

        bloodGroup: blood,

        previousDonation: previousDonation,

        phone: phone,

        whatsapp: whatsapp,

        address: address

    };

    donors.push(newDonor);

    localStorage.setItem("donors", JSON.stringify(donors));

    // ===============================
    // UPDATE USER ROLE
    // ===============================

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.forEach(function (user) {

        if (user.id === loggedInUser.id) {

            user.role = "Donor";

        }

    });

    localStorage.setItem("users", JSON.stringify(users));

    // ===============================
    // UPDATE LOGGED USER
    // ===============================

    loggedInUser.role = "Donor";

    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    // ===============================
    // SUCCESS
    // ===============================

    alert("Congratulations! You are now a Blood Donor.");

    window.location.href = "profile.html";

});

// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".Header nav");

if (menuBtn) {

    menuBtn.addEventListener("click", function () {

        nav.classList.toggle("open");

    });

}