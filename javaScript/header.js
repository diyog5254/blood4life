let path = window.location.pathname.includes("/admin/")
    ? "../header.html"
    : "header.html";

fetch(path)

    .then(response => response.text())

    .then(data => {

        document.getElementById("header").innerHTML = data;

        // ===============================
        // MOBILE MENU
        // ===============================

        const menuBtn = document.querySelector(".menu-btn");
        const navLinks = document.querySelector(".nav-links");

        if (menuBtn && navLinks) {

            menuBtn.addEventListener("click", function () {

                navLinks.classList.toggle("open");

                menuBtn.textContent =
                    navLinks.classList.contains("open")
                    ? "✖"
                    : "☰";

            });

        }

    });