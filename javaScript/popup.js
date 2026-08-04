const popupPath = window.location.pathname.includes("/admin/")
    ? "../popup.html"
    : "popup.html";

fetch(popupPath)
    .then(response => response.text())
    .then(data => {
        document.getElementById("popup-container").innerHTML = data;
    });

//success popup
function showPopup(title, message, redirectPage = null, type = "success") {

    document.getElementById("popupTitle").innerText = title;

    document.getElementById("popupMessage").innerText = message;

    const icon = document.getElementById("popupIcon");

    icon.className = "popup-icon " + type;

    if (type === "success") {

        icon.innerHTML = "✓";

    } else if (type === "error") {

        icon.innerHTML = "✕";

    } else if (type === "warning") {

        icon.innerHTML = "!";

    } else {

        icon.innerHTML = "i";

    }

    const popup = document.getElementById("popup");
    const popupBtn = document.getElementById("popupBtn");

    popup.style.display = "flex";

    popupBtn.focus();

    function closePopup() {

        popup.style.display = "none";

        document.removeEventListener("keydown", keyHandler);

        if (redirectPage) {

            window.location.href = redirectPage;

        }

    }

    function keyHandler(event) {

        if (event.key === "Enter" || event.key === "Escape") {

            closePopup();

            popup.onclick = function (event) {

                if (event.target === popup) {

                    closePopup();

                }

            };

        }

    }

    popupBtn.onclick = closePopup;
    popup.onclick = function (event) {

        if (event.target === popup) {

            closePopup();

        }

    };

    document.addEventListener("keydown", keyHandler);

}
function showConfirm(title, message, callback) {

    document.getElementById("confirmTitle").innerText = title;

    document.getElementById("confirmMessage").innerText = message;

    const popup = document.getElementById("confirmPopup");

    const yesBtn = document.getElementById("confirmYes");

    const noBtn = document.getElementById("confirmNo");

    popup.style.display = "flex";

    yesBtn.focus();

    function closePopup() {

        popup.style.display = "none";

        document.removeEventListener("keydown", keyHandler);

    }

    function keyHandler(event) {

        if (event.key === "Escape") {

            closePopup();

        }

    }

    yesBtn.onclick = function () {

        closePopup();

        callback();

    };

    noBtn.onclick = closePopup;

    document.addEventListener("keydown", keyHandler);
    popup.onclick = function (event) {

        if (event.target === popup) {

            closePopup();

        }

    };

}

function showLoading() {

    document.getElementById("loadingPopup").style.display = "flex";

}

function hideLoading() {

    document.getElementById("loadingPopup").style.display = "none";

}