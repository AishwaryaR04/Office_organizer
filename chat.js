// Function for Floating Chat Button
function startNewChat() {
    alert("Start a new chat!");
}

// Taskbar Navigation Example
document.querySelectorAll(".task-btn").forEach(button => {
    button.addEventListener("click", () => {
        alert(button.textContent + " Clicked!");
    });
});
