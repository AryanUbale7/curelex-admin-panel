const BASE_URL = "http://localhost:8080";
const API_URL = `${BASE_URL}/api/dashboard`;

/**
 * Initializes the dashboard
 */
async function initDashboard() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Dashboard data fetch failed");

        const data = await response.json();
        console.log("Dashboard data:", data); // debug

        updateChart(data.chart || {});
        renderDoctorTable(data.doctors || []);
        updateStats(data.stats || {});

    } catch (error) {
        console.error("Dashboard Error:", error);

        document.getElementById("doctorTable").innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding:20px; color:red">
                    Failed to load dashboard data.
                </td>
            </tr>`;
    }
}

/**
 * Chart update (safe)
 */
function updateChart(chartData) {
    const ctx = document.getElementById("patientChart");

    if (!ctx) return;

    new Chart(ctx, {
        type: "line",
        data: {
            labels: chartData.labels || ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [
                {
                    label: "Total Visits",
                    data: chartData.patients || [10, 20, 30, 40, 50],
                    borderColor: "#2563eb",
                    tension: 0.4
                },
                {
                    label: "New Patients",
                    data: chartData.newPatients || [5, 10, 15, 20, 25],
                    borderColor: "#16a34a",
                    borderDash: [5, 5],
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

/**
 * Doctor table
 */
function renderDoctorTable(doctors) {
    const table = document.getElementById("doctorTable");

    if (!table) return;

    table.innerHTML = "";

    if (!doctors.length) {
        table.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center">
                    No recent applications.
                </td>
            </tr>`;
        return;
    }

    doctors.forEach(d => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${d.name || "-"}</td>
            <td>${d.specialization || "-"}</td>
            <td>${d.license || "-"}</td>
            <td>
                <span class="status-${(d.status || "").toLowerCase()}">
                    ${d.status || "unknown"}
                </span>
            </td>
            <td>${d.date || "-"}</td>
        `;

        table.appendChild(row);
    });
}

/**
 * Stats update (safe mapping)
 */
function updateStats(stats) {
    if (!stats) return;

    // map manually (important)
    if (document.getElementById("totalDoctors"))
        document.getElementById("totalDoctors").innerText = stats.totalDoctors || 0;

    if (document.getElementById("totalPatients"))
        document.getElementById("totalPatients").innerText = stats.totalPatients || 0;

    if (document.getElementById("dailyPatients"))
        document.getElementById("dailyPatients").innerText = stats.dailyPatients || 0;
}

/**
 * Start
 */
initDashboard();