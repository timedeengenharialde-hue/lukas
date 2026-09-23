const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('desk', {
  fit: (w, h) => ipcRenderer.send('fit', { w, h }),
  show: () => ipcRenderer.send('show')
});
