const {
  contextBridge,
  ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld(
  "api", {
    send: async (channel, route, args) => {
      let validChannels = ["toMain", "toMainNoCache"];
      if (validChannels.includes(channel)) {
          ipcRenderer.send(channel, route, args);
      }
    },
    receive: async (channel, func) => {
      let validChannels = ["workspaces", "targets", "store", "settings", "packages" ];
      if (validChannels.includes(channel.split(":")[0])) {
        ipcRenderer.removeAllListeners([channel])
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      } else { console.log('invalid channel') }
    }
  }
);