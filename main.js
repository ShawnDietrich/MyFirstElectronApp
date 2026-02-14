const {app, BrowserWindow, ipcMain} = require('electron/main')
const path = require('node:path')
/**
 * A function to create a new browser window and load the index.html file.
 */
const createWindow = () => {
    const win = new BrowserWindow({
        width:800,
        height:600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

/**
 * When the app is ready, create a new window. If the app is activated and there are no windows, create a new window.
 */
app.whenReady().then(() => {
    ipcMain.handle('ping', () => '******************pong*********************')
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

/**
 * When all windows are closed, quit the app unless the platform is macOS (darwin), in which case do nothing.
 */
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

