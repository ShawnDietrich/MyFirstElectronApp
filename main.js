const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");
require("update-electron-app");

//Function to set the title of the window, which can be called from the renderer process via IPC.
function handleSetTitle(event, title) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
}

async function handleFileOpen() {
  const { cancled, filePaths } = await dialog.showOpenDialog();
  if (!cancled) {
    return filePaths[0];
  }
}

/**
 * A function to create a new browser window and load the index.html file.
 */
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

/**
 * When the app is ready, create a new window. If the app is activated and there are no windows, create a new window.
 */
app.whenReady().then(() => {
  ipcMain.on("set-title", handleSetTitle);
  ipcMain.handle("dialog:openFile", handleFileOpen);
  createWindow();
});

/**
 * When all windows are closed, quit the app unless the platform is macOS (darwin), in which case do nothing.
 */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
