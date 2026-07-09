// =====================================
// Login Protection
// =====================================

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {

    alert("Please Sign In First!");

    window.location.href = "signin.html";

}

// =====================================
// Auto Fill User Information
// =====================================

document.getElementById("patientName").value = loggedInUser.fullName;

document.getElementById("email").value = loggedInUser.email;

// =====================================
// Submit Request
// =====================================

document.getElementById("requestForm").addEventListener("submit", function (event) {

    event.preventDefault();

    let requests = JSON.parse(localStorage.getItem("requests")) || [];

    let newRequest = {

        id: Date.now(),

        userId: loggedInUser.id,

        patientName: loggedInUser.fullName,

        email: loggedInUser.email,

        bloodGroup: document.getElementById("bloodGroup").value,

        hospital: document.getElementById("hospital").value.trim(),

        contact: document.getElementById("contact").value.trim(),

        units: document.getElementById("units").value,

        emergency: document.getElementById("emergency").value,

        reason: document.getElementById("reason").value.trim(),

        status: "Pending"

    };

    requests.push(newRequest);

    localStorage.setItem("requests", JSON.stringify(requests));

    alert("Blood Request Submitted Successfully!");

    document.getElementById("requestForm").reset();

    document.getElementById("patientName").value = loggedInUser.fullName;
    document.getElementById("email").value = loggedInUser.email;

    window.location.href = "home.html";

});

// =====================================
// Mobile Navbar
// =====================================

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".Header nav");

if (menuBtn) {

    menuBtn.addEventListener("click", function () {

        nav.classList.toggle("open");

    });

}