const BASE_URL = "http://localhost:8080";
const API_URL = `${BASE_URL}/api/analytics`;

/**
 * Initialize analytics
 */
async function initAnalytics() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch analytics data");

        const data = await response.json();
        console.log("Analytics Data:", data); // debug

        renderGrowthChart(data.growth || {});
        renderDailyActivityChart(data.daily || {});
        renderAgeDistributionChart(data.age || {});
        renderGenderChart(data.gender || {});
        renderReturnChart(data.retention || {});

    } catch (error) {
        console.error("Analytics Error:", error);
    }
}

/* ================= CHARTS ================= */

function renderGrowthChart(growthData) {
    new Chart(document.getElementById("growthChart"), {
        type: "line",
        data: {
            labels: growthData.labels || ["Jan", "Feb", "Mar"],
            datasets: [{
                label: "Patients",
                data: growthData.values || [10, 20, 30],
                borderColor: "#2563eb",
                backgroundColor: "rgba(37,99,235,0.1)",
                fill: true,
                tension: 0.4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function renderDailyActivityChart(dailyData) {
    new Chart(document.getElementById("dailyChart"), {
        type: "bar",
        data: {
            labels: dailyData.labels || ["Mon", "Tue", "Wed", "Thu", "Fri"],
            datasets: [{
                label: "Visits",
                data: dailyData.values || [5, 10, 15, 20, 25],
                backgroundColor: "#2563eb"
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function renderAgeDistributionChart(ageData) {
    new Chart(document.getElementById("ageChart"), {
        type: "bar",
        data: {
            labels: ageData.labels || ["0-17", "18-34", "35-54"],
            datasets: [{
                label: "Patients",
                data: ageData.values || [10, 20, 30],
                backgroundColor: "#2563eb"
            }]
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function renderGenderChart(genderData) {
    new Chart(document.getElementById("genderChart"), {
        type: "pie",
        data: {
            labels: genderData.labels || ["Male", "Female"],
            datasets: [{
                data: genderData.values || [60, 40],
                backgroundColor: ["#2563eb", "#ec4899"]
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function renderReturnChart(retentionData) {
    new Chart(document.getElementById("returnChart"), {
        type: "bar",
        data: {
            labels: retentionData.labels || ["Week1", "Week2"],
            datasets: [
                {
                    label: "New Patients",
                    data: retentionData.newPatients || [10, 20],
                    backgroundColor: "#2563eb"
                },
                {
                    label: "Returning",
                    data: retentionData.returningPatients || [5, 15],
                    backgroundColor: "#16a34a"
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { stacked: true },
                y: { stacked: true }
            }
        }
    });
}

/* ================= START ================= */

initAnalytics();