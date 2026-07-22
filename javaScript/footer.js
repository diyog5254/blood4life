let footerPath = window.location.pathname.includes("/admin/")
    ? "../footer.html"
    : "footer.html";


fetch(footerPath)

    .then(response => response.text())

    .then(data => {

        document.getElementById("footer").innerHTML = data;

    });