let doctors = [];
let currentTab = "All";
const API_URL = "http://localhost:8080/api/doctors";

/**
 * Fetch doctors from the server
 */
async function fetchDoctors() {
    const table = document.getElementById("doctorTable");
    table.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:20px">Loading doctors...</td></tr>`;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch doctors");

        doctors = await response.json();
        console.log("Doctors data:", doctors); // debug

        renderDoctors();
    } catch (error) {
        console.error("Error:", error);
        table.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;padding:20px;color:red">
                    Error loading doctors. Please try again later.
                </td>
            </tr>`;
    }
}

/**
 * Add a new doctor
 */
async function addDoctor(doctorData) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(doctorData)
        });

        if (!response.ok) throw new Error("Failed to add doctor");

        await fetchDoctors();
    } catch (error) {
        console.error("Error adding doctor:", error);
        alert("Could not add doctor.");
    }
}

/**
 * Tab switch
 */
function setTab(tab, event) {
    currentTab = tab;

    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    event.target.classList.add("active");

    renderDoctors();
}

/**
 * Search input
 */
document.getElementById("searchDoctor").addEventListener("input", renderDoctors);

/**
 * Render doctors
 */
function renderDoctors() {
    const search = document.getElementById("searchDoctor").value.toLowerCase();
    const table = document.getElementById("doctorTable");

    table.innerHTML = "";

    const filtered = doctors.filter(d => {
        const status = (d.status || "").toLowerCase();
        const tab = currentTab.toLowerCase();

        const tabMatch = tab === "all" || status === tab;

        const searchMatch =
            (d.name || "").toLowerCase().includes(search) ||
            (d.specialization || "").toLowerCase().includes(search);

        return tabMatch && searchMatch;
    });

    if (filtered.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;padding:20px">
                    No doctors found.
                </td>
            </tr>`;
        return;
    }

    filtered.forEach(d => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${d.name || "-"}</td>
            <td>${d.specialization || "-"}</td>
            <td>
                <span class="status ${(d.status || "").toLowerCase()}">
                    ${d.status || "unknown"}
                </span>
            </td>
            <td>
                <button class="view-btn">View</button>
            </td>
        `;

        table.appendChild(row);
    });
}

// Initial Load
fetchDoctors();