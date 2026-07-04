async function loadDonors() {
    try {
        const response = await fetch("data/donor.json");
        const donors = await response.json();

        const table = document.getElementById("donorTable");
        table.innerHTML = "";

        donors.forEach(donor => {
            table.innerHTML += `
                <tr>
                    <td>${donor.name}</td>
                    <td>${donor.bloodGroup}</td>
                    <td>${donor.location}</td>
                    <td>${donor.contact}</td>
                    <td>${donor.lastDonation}</td>
                    <td>${donor.status}</td>
                    <td><button>View</button></td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error loading donors:", error);
    }
}

loadDonors();