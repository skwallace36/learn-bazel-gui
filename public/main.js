const { app, BrowserWindow, ipcMain } = require('electron');
const spawn = require('child_process');
const path = require("path");
const fs = require("fs");
const electronReload = require('electron-reload')


let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  })

  win.loadURL('http://localhost:3000');
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windowes open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


ipcMain.on("toMain", (event, args) => {
  console.log(args);
  fs.readFile("path/to/file", (error, data) => {
    responseObj = "data2555"
    win.webContents.send("fromMain", responseObj);
  });
});

// ipcMain.on('request-mainprocess-action', (event, arg) => {
//     console.log(arg);
//     event.sender.send('mainprocess-response', "Hello World!");
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.