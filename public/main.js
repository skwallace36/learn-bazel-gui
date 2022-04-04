const { app, BrowserWindow, ipcMain } = require('electron');
const spawn = require('child_process');
const path = require("path");
const fs = require("fs");

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
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// const ls = spawn('ls', ['-lh', '/usr']);

// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });
// 
// ls.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });
// 
// ls.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });

ipcMain.on("toMain", (event, args) => {
  fs.readFile("path/to/file", (error, data) => {
    // Do something with file contents
    responseObj = "data222"
    // Send result back to renderer process
    win.webContents.send("fromMain", responseObj);
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.