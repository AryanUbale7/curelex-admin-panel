const BASE_URL = "http://localhost:8080";

async function fetchDoctors() {
    const table = document.getElementById("doctorTable");

    try {
        const res = await fetch(`${BASE_URL}/api/doctors/pending`);
        if (!res.ok) throw new Error("Failed to fetch doctor data");

        const doctors = await res.json();

        table.innerHTML = "";

        if (!doctors.length) {
            table.innerHTML = `<tr><td colspan="6">No pending doctors</td></tr>`;
            return;
        }

        doctors.forEach(d => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${d.name}</td>
                <td>${d.specialization}</td>
                <td>${d.license}</td>
                <td>${d.date}</td>
                <td><span class="status-pending">${d.status}</span></td>
                <td>
                    <button onclick="verifyDoctor(${d.id}, 'approved')">Approve</button>
                    <button onclick="verifyDoctor(${d.id}, 'rejected')">Reject</button>
                </td>
            `;

            table.appendChild(row);
        });

    } catch (err) {
        console.error("Fetch error:", err);
        table.innerHTML = `<tr><td colspan="6" style="color:red">Error loading doctors</td></tr>`;
    }
}

async function verifyDoctor(id, status) {
    try {
        await fetch(`${BASE_URL}/api/doctors/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, status })
        });

        fetchDoctors(); // refresh
    } catch (err) {
        console.error("Verification error:", err);
    }
}

fetchDoctors();