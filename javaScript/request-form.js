// LOGIN CHECK

const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);


if (!loggedInUser) {

    showPopup(
        "Login Required",
        "Please sign in first.",
        "signin.html",
        "warning"
    );

    throw new Error("User not logged in");
}

// AUTO FILL USER INFORMATION

document.getElementById("email").value =
    loggedInUser.email || "";


// Email

document.getElementById("email").value =
    loggedInUser.email || "";


// Contact

document.getElementById("contact").value =
    loggedInUser.phone || "";

// REQUEST FORM

document
    .getElementById("requestForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        // GET FORM VALUES

        let patientName =
            document.getElementById("patientName")
                .value
                .trim();


        let email =
            document.getElementById("email")
                .value
                .trim();


        let bloodGroup =
            document.getElementById("bloodGroup")
                .value;


        let hospital =
            document.getElementById("hospital")
                .value
                .trim();


        let contact =
            document.getElementById("contact")
                .value
                .trim();


        let units =
            Number(
                document.getElementById("units")
                    .value
            );


        let emergency =
            document.getElementById("emergency")
                .value;


        let reason =
            document.getElementById("reason")
                .value
                .trim();

        // VALIDATION

        if (!patientName) {

            showPopup(
                "Invalid Patient Name",
                "Patient name is required.",
                null,
                "warning"
            );

            return;

        }


        if (!bloodGroup) {

            showPopup(
                "Blood Group Required",
                "Please select a blood group.",
                null,
                "warning"
            );

            return;

        }


        if (!hospital) {

            showPopup(
                "Hospital Required",
                "Please enter hospital name.",
                null,
                "warning"
            );

            return;

        }


        if (!contact) {

            showPopup(
                "Contact Required",
                "Please enter contact number.",
                null,
                "warning"
            );

            return;

        }


        if (units < 1 || units > 10) {

            showPopup(
                "Invalid Units",
                "Blood units must be between 1 and 10.",
                null,
                "warning"
            );

            return;
        }


        if (!emergency) {

            showPopup(
                "Emergency Level Required",
                "Please select emergency level.",
                null,
                "warning"
            );

            return;

        }


        if (!reason) {

            showPopup(
                "Reason Required",
                "Please enter the reason for the blood request.",
                null,
                "warning"
            );

            return;

        }

        // LOAD EXISTING REQUESTS

        let requests =
            JSON.parse(
                localStorage.getItem("requests")
            ) || [];

        // CREATE NEW REQUEST

        let newRequest = {

            requestId: Date.now(),

            patientName: patientName,

            email: email,

            bloodGroup: bloodGroup,

            hospital: hospital,

            contact: contact,

            units: units,

            emergency: emergency,

            reason: reason,

            requestDate:
                new Date().toLocaleDateString(),

            status: "Pending"

        };

        // SAVE REQUEST

        requests.push(newRequest);


        localStorage.setItem(
            "requests",
            JSON.stringify(requests)
        );

        // SUCCESS

        showPopup(
            "Success",
            "Blood Request Submitted Successfully.",
            "dashboardpage.html",
            "success"
        );


        // Reset form

        this.reset();


        // Restore auto-filled information

        document.getElementById("patientName").value =
            loggedInUser.fullName || "";

        document.getElementById("email").value =
            loggedInUser.email || "";

        document.getElementById("contact").value =
            loggedInUser.phone || "";

    });

// MOBILE MENU

const menuBtn =
    document.querySelector(".menu-btn");

const nav =
    document.querySelector(".Header nav");


if (menuBtn && nav) {

    menuBtn.addEventListener(
        "click",
        function () {

            nav.classList.toggle("open");

        }
    );

}