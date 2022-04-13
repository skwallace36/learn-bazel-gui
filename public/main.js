const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");
const fs = require("fs");
const electronReload = require('electron-reload')
const { readdir } = require('fs/promises');
const { asyncRouter } = require('./routes.js');
const Store = require('electron-store');

const sleep = ms => new Promise(r => setTimeout(r, ms));


let win;
let store;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 800,
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

loadDatabase = () => {
  const schema = {
    "routes" : {
      "type": "object"
    },
    "route" : {
      "type": "object",
      "properties": {
        "data": { "type": "object" }
      }
    },
    "settings" : {
      "type": "object",
      "properties": {
        "value" : { "type": "object" }
      }
    }
  }
  store = new Store({schema})
}

app.whenReady().then(createWindow).then(loadDatabase())

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { app.quit() }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) { createWindow() }
})

// TODO: remove useCache with validation or some other change to api
// possible excluding some routes completely (i.e 'settings')
ipcMain.on("toMain", async (event, route, args) => {  
  const action = route.split(":")[1]
  if(action !== 'set' || args.disableCache !== true) {
    let cachedRoute = store.get(`routes.${route}`)
    if (typeof cachedRoute !== 'undefined' && typeof cachedRoute.data !== 'undefined') {
      win.webContents.send(route, true, cachedRoute.data);
    }
  }

  const router = asyncRouter(route)
  var data = await router(store, route, args)
  win.webContents.send(route, false, data);
});
