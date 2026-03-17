let patients = [];

const BASE_URL = "http://localhost:8080";
const API_URL = `${BASE_URL}/api/patients`;

/**
 * Fetch patients
 */
async function fetchPatients() {
    const table = document.getElementById("patientTable");

    table.innerHTML = `
        <tr>
            <td colspan="4" style="text-align:center;padding:20px">
                Loading patients...
            </td>
        </tr>`;

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        patients = await response.json();
        console.log("Patients:", patients); // debug

        renderPatients();

    } catch (error) {
        console.error("Failed to fetch patients:", error);

        table.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;padding:20px;color:red;">
                    Failed to load patient data.
                </td>
            </tr>`;
    }
}

document.getElementById("searchPatient").addEventListener("input", renderPatients);

function renderPatients() {
    const search = document.getElementById("searchPatient").value.toLowerCase();
    const table = document.getElementById("patientTable");

    table.innerHTML = "";

    const filtered = patients.filter(p =>
        (p.name || "").toLowerCase().includes(search) ||
        (p.status || "").toLowerCase().includes(search)
    );

    if (filtered.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;padding:20px">
                    No patients found.
                </td>
            </tr>`;
        return;
    }

    filtered.forEach(p => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${p.name || "-"}</td>
            <td>${p.age || "-"}</td>
            <td>${p.lastVisit || "-"}</td>
            <td>
                <span class="status ${(p.status || "").toLowerCase()}">
                    ${p.status || "unknown"}
                </span>
            </td>
        `;

        table.appendChild(row);
    });
}

// Start
fetchPatients();