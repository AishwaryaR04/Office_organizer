from flask import Flask, request, jsonify, render_template
import subprocess
import os

app = Flask(__name__)

# Load tasks from file
def load_tasks():
    try:
        with open("tasks.txt", "r") as file:
            return [line.strip() for line in file if line.strip()]
    except FileNotFoundError:
        return []

# Save tasks to file
def save_task(task_description):
    with open("tasks.txt", "a") as file:
        file.write(task_description + "\n")

@app.route("/")
def home():
    return render_template("task.html")  # Serve HTML

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(load_tasks())  # Return tasks as JSON

@app.route("/add_task", methods=["POST"])
def add_task():
    task_description = request.json.get("task", "").strip()
    if not task_description:
        return jsonify({"error": "Task description is required"}), 400

    try:
        exe_path = os.path.join(os.getcwd(), "sample.exe")  # Path to C executable
        result = subprocess.run([exe_path, task_description], capture_output=True, text=True, check=True)
        
        # Save the task to the file
        save_task(task_description)
        
        return jsonify({"message": "Task added successfully!"}), 200
    except subprocess.CalledProcessError as e:
        return jsonify({"error": f"Failed to add task: {str(e)}"}), 500
    except FileNotFoundError:
        return jsonify({"error": "Executable not found"}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)