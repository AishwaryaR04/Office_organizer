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
});
