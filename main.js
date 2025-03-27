const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let cameraWindow;
let meetWindow;

// Ensure the app is ready before creating windows
app.whenReady().then(() => {
    // Create the main application window
    mainWindow = new BrowserWindow({
        width: 400,
        height: 790,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // Ensure IPC communication works
        }
    });

    // Load the main home page
    mainWindow.loadFile('home.html');

    // Handle opening the camera window
    ipcMain.on('open-camera', () => {
        if (!cameraWindow) {
            cameraWindow = new BrowserWindow({
                width: 800,
                height: 600,
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false,
                }
            });

            cameraWindow.loadFile('camera.html');

            cameraWindow.on('closed', () => {
                cameraWindow = null;
            });
        }
    });

    // Save the captured image
    ipcMain.on('save-image', (event, photoDataUrl) => {
        const base64Data = photoDataUrl.replace(/^data:image\/jpeg;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');
        const savePath = path.join(app.getPath('pictures'), 'captured_photo.jpg');

        fs.writeFile(savePath, imageBuffer, (err) => {
            if (err) {
                console.error('Error saving image:', err);
            } else {
                console.log('Image saved successfully to:', savePath);
            }
        });
    });

    // Handle opening Google Meet window
    ipcMain.on('start-meeting', () => {
        if (!meetWindow) {
            meetWindow = new BrowserWindow({
                width: 1000,
                height: 700,
                webPreferences: {
                    nodeIntegration: false, // Security best practice
                    contextIsolation: true,
                }
            });

            meetWindow.loadURL("https://meet.google.com/new");

            meetWindow.on("closed", () => {
                meetWindow = null;
            });
        }
    });
});

// Handle app closing on Windows/Linux
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});