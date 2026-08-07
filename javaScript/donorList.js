const donors = JSON.parse(localStorage.getItem("donors")) || [];

const donorTableBody = document.getElementById("donorTableBody");

function displayDonors(donorList) {

    donorTableBody.innerHTML = "";

    donorList.forEach(function (donor) {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${donor.fullName}</td>
            <td>${donor.email}</td>
            <td>${donor.bloodGroup}</td>
            <td>${donor.phone}</td>
            <td>${donor.address}</td>
        `;

        donorTableBody.appendChild(row);

    });

}

// First load
displayDonors(donors);


const searchInput = document.getElementById("searchInput");
const bloodFilter = document.getElementById("bloodFilter");

searchInput.addEventListener("keyup", filterDonors);
bloodFilter.addEventListener("change", filterDonors);

function filterDonors() {

    const searchValue = searchInput.value.toLowerCase();
    const selectedBlood = bloodFilter.value;

    const filteredDonors = donors.filter(function (donor) {

        const nameMatch = donor.fullName
            .toLowerCase()
            .includes(searchValue);

        const bloodMatch =
            selectedBlood === "" ||
            donor.bloodGroup === selectedBlood;

        return nameMatch && bloodMatch;

    });

    displayDonors(filteredDonors);

}