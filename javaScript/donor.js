fetch("data/donors.json")
.then(response => response.json())
.then(donors => {

    const table = document.getElementById("donorTable");

    donors.forEach(donor => {

        const row = `
        <tr>
            <td>${donor.name}</td>
            <td>${donor.bloodGroup}</td>
            <td>${donor.location}</td>
            <td>${donor.contact}</td>
            <td>${donor.lastDonation}</td>
            <td>${donor.status}</td>
            <td>
                <button>Request</button>
            </td>
        </tr>
        `;

        table.innerHTML += row;

    });

})
.catch(error => {
    console.log(error);
});