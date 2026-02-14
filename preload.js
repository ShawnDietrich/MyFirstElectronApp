const {contextBridge, ipcRenderer} = require('electron');

/**
 * A preload script contains code that runs before your web page is loaded into the browser window. It has access to both DOM APIs and Node.js environment, and is often used to expose privileged APIs to the renderer via the contextBridge API.
 */
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    // We can also expose variables, not just functions
    myName: 'Shawn',
    ping: () => ipcRenderer.invoke('ping')
})