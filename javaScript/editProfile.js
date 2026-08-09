const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {

    showPopup(
        "Login Required",
        "Please sign in first.",
        "signin.html",
        "warning"
    );

}

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


document.getElementById("editProfileForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        let fullName = document.getElementById("fullName").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let whatsapp = document.getElementById("whatsapp").value.trim();
        let address = document.getElementById("address").value.trim();

        // UPDATE USERS

        let users = JSON.parse(localStorage.getItem("users")) || [];

        users.forEach(function (user) {

            if (user.id === loggedInUser.id) {

                user.fullName = fullName;
                user.phone = phone;
                user.whatsapp = whatsapp;
                user.address = address;

            }

        });

        localStorage.setItem("users", JSON.stringify(users));

        // UPDATE LOGGED IN USER

        loggedInUser.fullName = fullName;
        loggedInUser.phone = phone;
        loggedInUser.whatsapp = whatsapp;
        loggedInUser.address = address;

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(loggedInUser)
        );

        // UPDATE DONOR (if donor)

        let donors = JSON.parse(localStorage.getItem("donors")) || [];

        donors.forEach(function (donor) {

            if (donor.userId == loggedInUser.id) {

                donor.fullName = fullName;
                donor.phone = phone;
                donor.whatsapp = whatsapp;
                donor.address = address;

            }

        });

        localStorage.setItem("donors", JSON.stringify(donors));

        showPopup(
            "Success",
            "Profile updated successfully!",
            "profile.html",
            "success"
        );

    });