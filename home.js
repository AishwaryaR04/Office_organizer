document.addEventListener("DOMContentLoaded", () => {
    // Start Meeting button functionality
    document.getElementById("startMeeting").addEventListener("click", () => {
        const meetingUrl = `https://meet.example.com/${Math.random().toString(36).substring(7)}`;
        alert(`Your conference URL: ${meetingUrl}`);
    });

    // Action buttons
    document.querySelectorAll(".action-btn").forEach(button => {
        button.addEventListener("click", () => {
            alert(`You clicked: ${button.innerText}`);
        });
    });

    // Notification Start button
    document.querySelector(".notification-card button").addEventListener("click", () => {
        alert("Starting the team meeting...");
    });
});
document.querySelectorAll(".taskbar-btn").forEach(button => {
    button.addEventListener("click", () => {
        alert(`Opening: ${button.innerText.trim()}`);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const savedSettings = JSON.parse(localStorage.getItem("userSettings"));
  
    if (savedSettings) {
      // Update Profile Picture
      const profileImg = document.querySelector(".profile img");
      if (savedSettings.profilePic) {
        profileImg.src = savedSettings.profilePic;
      }
  
      // Update Username
      const usernameElement = document.querySelector(".user-info h2");
      usernameElement.textContent = `Hi, ${savedSettings.username || 'User'}`;
    }
  });
  