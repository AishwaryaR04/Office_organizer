function openTab(tabId) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

    // Add active class to clicked tab
    document.querySelector(`[onclick="openTab('${tabId}')"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Set default tab on page load
document.addEventListener("DOMContentLoaded", () => {
    openTab('new-meeting');

    // Ensure Electron is available
    if (typeof require !== "undefined") {
        const { ipcRenderer } = require("electron");

        // Select the button
        const startMeetingBtn = document.querySelector(".start-btn");

        if (startMeetingBtn) {
            startMeetingBtn.addEventListener("click", () => {
                console.log("Starting Google Meet...");
                ipcRenderer.send("start-meeting"); // Open Google Meet window
            });

            startMeetingBtn.addEventListener("click", () => {
                fetch("http://localhost:5000/api/test")
                    .then(response => response.json())
                    .then(data => {
                        console.log("Response from backend:", data);
                        alert(data.message); // Show backend response
                    })
                    .catch(error => console.error("Error:", error));
            });
        }
    }
});
