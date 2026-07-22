// LOGIN CHECK

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {

    alert("Please Sign In First!");

    window.location.href = "signin.html";

}


// AUTO FILL


let patientName = document.getElementById("patientName").value.trim();
document.getElementById("email").value = loggedInUser.email;

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

        alert("Units must be at least 1.");

        return;

    }

    // SAVE REQUEST

    let requests = JSON.parse(localStorage.getItem("requests")) || [];

    let newRequest = {

        requestId: Date.now(),

        userId: loggedInUser.id,

        patientName: patientName,

        email: loggedInUser.email,

        bloodGroup: bloodGroup,

        hospital: hospital,

        contact: contact,

        units: units,

        emergency: emergency,

        reason: reason,

        requestDate: new Date().toLocaleString(),

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

});

// MOBILE MENU

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".Header nav");

if (menuBtn) {

    menuBtn.addEventListener("click", function () {

        nav.classList.toggle("open");

    });

}