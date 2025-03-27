document.addEventListener("DOMContentLoaded", () => {
    const saveButton = document.getElementById("save-settings");
    const profilePicInput = document.getElementById("profile-pic");
    const profileImg = document.getElementById("profile-img");
  
    // Update Profile Picture Preview
    profilePicInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          profileImg.src = event.target.result;
          localStorage.setItem("profilePic", event.target.result); // Save to localStorage
        };
        reader.readAsDataURL(file);
      }
    });
  
    saveButton.addEventListener("click", () => {
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const emailNotifications = document.getElementById("email-notifications").checked;
      const pushNotifications = document.getElementById("push-notifications").checked;
      const darkMode = document.getElementById("dark-mode").checked;
  
      const settings = {
        username,
        email,
        emailNotifications,
        pushNotifications,
        darkMode,
        profilePic: localStorage.getItem("profilePic") || profileImg.src
      };
  
      localStorage.setItem("userSettings", JSON.stringify(settings));
      alert("Settings saved successfully!");
    });
  
    // Load settings from localStorage
    const savedSettings = JSON.parse(localStorage.getItem("userSettings"));
    if (savedSettings) {
      document.getElementById("username").value = savedSettings.username;
      document.getElementById("email").value = savedSettings.email;
      document.getElementById("email-notifications").checked = savedSettings.emailNotifications;
      document.getElementById("push-notifications").checked = savedSettings.pushNotifications;
      document.getElementById("dark-mode").checked = savedSettings.darkMode;
      if (savedSettings.profilePic) {
        profileImg.src = savedSettings.profilePic;
      }
    }
  });
  document.getElementById('profile-pic').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const profileImg = document.getElementById('profile-img');
        profileImg.src = e.target.result;
  
        // Update in localStorage
        const settings = JSON.parse(localStorage.getItem("userSettings")) || {};
        settings.profilePic = e.target.result;
        localStorage.setItem("userSettings", JSON.stringify(settings));
      };
      reader.readAsDataURL(file);
    }
  });
  
  