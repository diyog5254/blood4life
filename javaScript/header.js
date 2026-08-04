let isAdminPage = window.location.pathname.includes("/admin/");

const headerPath = isAdminPage ? "../header.html" : "header.html";

fetch(headerPath)
    .then(res => res.text())
    .then(data => {

        document.getElementById("header").innerHTML = data;

        const navLinks = document.getElementById("navLinks");
        const headerButtons = document.getElementById("headerButtons");

        const user = JSON.parse(localStorage.getItem("loggedInUser"));

        // PAGE PATHS

        const home = isAdminPage ? "../home.html" : "home.html";
        const about = isAdminPage ? "../about.html" : "about.html";
        const gallery = isAdminPage ? "../gallery.html" : "gallery.html";
        const signin = isAdminPage ? "../signin.html" : "signin.html";
        const signup = isAdminPage ? "../signup.html" : "signup.html";
        const profile = isAdminPage ? "../profile.html" : "profile.html";
        const donor = isAdminPage ? "../donor-form.html" : "donor-form.html";
        const request = isAdminPage ? "../request-form.html" : "request-form.html";
        const dashboard = isAdminPage ? "../dashboardPage.html" : "dashboardPage.html";

        const adminDashboard = isAdminPage
            ? "adminDashboard.html"
            : "admin/adminDashboard.html";

        const donorList = isAdminPage
            ? "donorList.html"
            : "admin/donorList.html";

        const requestList = isAdminPage
            ? "requestList.html"
            : "admin/requestList.html";

        // NAVBAR
        if (!user) {

            navLinks.innerHTML = `
                <a href="${home}">Home</a>
                <a href="${about}">About</a>
                <a href="${gallery}">Gallery</a>
                <a href="${signin}">Sign In</a>
                <a href="${signup}">Sign Up</a>
            `;

        } else if (user.role === "Admin") {

            navLinks.innerHTML = `
                <a href="${home}">Home</a>
                <a href="${adminDashboard}">Dashboard</a>
                <a href="${donorList}">Donors</a>
                <a href="${requestList}">Requests</a>
                <a href="${profile}">Profile</a>
                <a href="#" id="logoutBtn">Logout</a>
            `;

        } else {

            navLinks.innerHTML = `
                <a href="${home}">Home</a>
                <a href="${about}">About</a>
                <a href="${gallery}">Gallery</a>
                <a href="${dashboard}">Dashboard</a>
                <a href="${profile}">Profile</a>
                <a href="#" id="logoutBtn">Logout</a>
            `;

        }

        // HEADER BUTTONS

        if (headerButtons) {

            headerButtons.innerHTML = `
                <a href="${donor}">Become Donor</a>
                <a href="${request}">Request Blood</a>
            `;
        }

        // MOBILE MENU

        const menuBtn = document.querySelector(".menu-btn");

        if (menuBtn) {

            menuBtn.addEventListener("click", () => {

                navLinks.classList.toggle("open");

            });

        }

        // LOGOUT

        const logoutBtn = document.getElementById("logoutBtn");

        if (logoutBtn) {

            logoutBtn.addEventListener("click", (e) => {

                e.preventDefault();

                localStorage.removeItem("loggedInUser");

                alert("Logged out successfully!");

                window.location.href = signin;

            });

        }

    })
    .catch(error => {

        console.log("Header loading error:", error);

    });