const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.Header nav');

if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
}


let slides = document.querySelectorAll(".slide");

let current = 0;


setInterval(function () {

    slides[current].classList.remove("active");


    current++;

    if (current >= slides.length) {
        current = 0;
    }


    slides[current].classList.add("active");


}, 3000);

// HOME STATISTICS
function loadHomeStats() {


    let donors = JSON.parse(
        localStorage.getItem("donors")
    ) || [];


    let requests = JSON.parse(
        localStorage.getItem("requests")
    ) || [];



    // Total Donors

    document.getElementById("homeDonors").textContent =
        donors.length;



    // Blood Groups

    let groups = new Set();


    donors.forEach(function (donor) {

        groups.add(donor.bloodGroup);

    });


    document.getElementById("bloodGroups").textContent =
        groups.size;



    // Available Requests

    let pendingRequests = requests.filter(function (request) {

        return request.status === "Pending";

    });


    document.getElementById("availableRequests").textContent =
        pendingRequests.length;



    // Lives Saved (Example Calculation)
    // 1 donation = 3 lives

    document.getElementById("livesSaved").textContent =
        donors.length * 3;


}

loadHomeStats();

// // NAVBAR LOGIN STATUS


// let loggedInUser = JSON.parse(
//     localStorage.getItem("loggedInUser")
// );



// let loginLink = document.getElementById("loginLink");
// let profileLink = document.getElementById("profileLink");
// let dashboardLink = document.getElementById("dashboardLink");
// let logoutLink = document.getElementById("logoutLink");



// if (loggedInUser) {


//     loginLink.style.display = "none";

//     profileLink.style.display = "block";

//     logoutLink.style.display = "block";



//     if (loggedInUser.role === "Admin") {

//         dashboardLink.style.display = "block";

//     }


// }



// Logout

// logoutLink.addEventListener(
//     "click",
//     function (e) {

//         e.preventDefault();


//         localStorage.removeItem(
//             "loggedInUser"
//         );


//         window.location.href =
//             "signin.html";


//     });