// ===============================
// LOGIN CHECK
// ===============================

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));


if (!loggedInUser) {

    alert("Please Sign In First!");

    window.location.href = "signin.html";

}


// ===============================
// CHECK DONOR STATUS
// ===============================

const donors = JSON.parse(localStorage.getItem("donors")) || [];


const donor = donors.find(function(item){

    return item.userId == loggedInUser.id;

});


// ===============================
// BECOME DONOR BUTTON
// ===============================

const donorBtn = document.querySelector(".donate-btn");


if (donor) {


    donorBtn.style.display = "none";


} else {


    donorBtn.style.display = "block";


}



// ===============================
// REQUEST BLOOD BUTTON
// ===============================

const requestBtn = document.getElementById("requestBtn");


if (requestBtn) {


    requestBtn.addEventListener("click", function(event){


        if (!loggedInUser) {

            event.preventDefault();

            alert("Please login first!");

        }


    });


}



// ===============================
// DASHBOARD PROFILE INFO
// ===============================

document.getElementById("userName").innerText =
    loggedInUser.fullName;


document.getElementById("userRole").innerText =
    loggedInUser.role;



// ===============================
// LOGOUT
// ===============================

const logoutBtn = document.getElementById("logoutBtn");


if(logoutBtn){

    logoutBtn.addEventListener("click", function(){


        localStorage.removeItem("loggedInUser");


        window.location.href = "signin.html";


    });

}