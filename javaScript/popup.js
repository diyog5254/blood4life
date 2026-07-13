function showPopup(title, message, redirectPage = null){

    document.getElementById("popupTitle").innerText = title;

    document.getElementById("popupMessage").innerText = message;

    document.getElementById("popup").style.display = "flex";

    document.getElementById("popupBtn").onclick = function(){

        document.getElementById("popup").style.display = "none";

        if(redirectPage){

            window.location.href = redirectPage;

        }

    };

}

function showConfirm(title, message, callback){

    document.getElementById("confirmTitle").innerText = title;

    document.getElementById("confirmMessage").innerText = message;

    document.getElementById("confirmPopup").style.display = "flex";

    document.getElementById("confirmYes").onclick = function(){

        document.getElementById("confirmPopup").style.display = "none";

        callback();

    };

    document.getElementById("confirmNo").onclick = function(){

        document.getElementById("confirmPopup").style.display = "none";

    };

}