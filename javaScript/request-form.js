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


// AUTO FILL


let patientName = document.getElementById("email").value = loggedInUser.email;
document.getElementById("contact").value = loggedInUser.phone || "";

// REQUEST FORM

document.getElementById("requestForm").addEventListener("submit", function (event) {

    event.preventDefault();

    let bloodGroup = document.getElementById("bloodGroup").value;

    let hospital = document.getElementById("hospital").value.trim();

    let contact = document.getElementById("contact").value.trim();

    let units = Number(document.getElementById("units").value);

    let emergency = document.getElementById("emergency").value;

    let reason = document.getElementById("reason").value.trim();

    // VALIDATION

    if (units < 1) {

        showPopup(
            "Invalid Units",
            "Units must be at least 1.",
            null,
            "warning"
        );
        return;
    }

    // SAVE REQUEST
    let requests = JSON.parse(localStorage.getItem("requests")) || [];

    let newRequest = {
        id: Date.now(),
        patientName: document.getElementById("patientName").value,
        email: document.getElementById("email").value,
        bloodGroup: document.getElementById("bloodGroup").value,
        hospital: document.getElementById("hospital").value,
        contact: document.getElementById("contact").value,
        units: document.getElementById("units").value,
        emergency: document.getElementById("emergency").value,
        reason: document.getElementById("reason").value,
        status: "Pending"
    };


    requests.push(newRequest);

    localStorage.setItem("requests", JSON.stringify(requests));
    // SUCCESS

    showPopup(
        "Success",
        "Blood Request Submitted Successfully.",
        "dashboardpage.html"
    );

    this.reset();

});

// MOBILE MENU

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".Header nav");

if (menuBtn) {

    menuBtn.addEventListener("click", function () {

        nav.classList.toggle("open");

    });

}