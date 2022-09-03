// Modules to control application life and create native browser window
const { ipcMain, app, BrowserWindow, TouchBar, nativeImage } = require('electron')
const { TouchBarButton } = TouchBar

// electron-builder --universal to deploy the app on macOS...

const path = require('path')

let isSuccess = false

// Reloads the window when renderer.js detects a button click...
ipcMain.on("reload", (event, args) => {
    getData(mainWindow, checkOnlineStatus)
})

const getData = (win, func) => {
    win.loadURL("https://electronvisual.org")

    func(win)
}

const checkOnlineStatus = (win) => {
    isSuccess = true
    win.webContents.on("did-fail-load", function() {
        win.loadFile(path.join(__dirname, "error.html"))
        isSuccess = false
    })
}

let counter = 0;

const image = nativeImage.createFromPath('./assets/icon.png').resize({ height: 20 });

let mainWindow = null

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        backgroundColor: '#212936',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    const button = new TouchBarButton({
        icon: image,
        iconPosition: 'left',
        label: "Okay, Let's get going then!",
        accessibilityLabel: 'Button looking like a label',
        backgroundColor: '#3A3B3C',
        click: () => {
            if (isSuccess == false) {
                getData(mainWindow, checkOnlineStatus)
            }
        },
    })

    const touchBar = new TouchBar({
        items: [
            button,
        ],
    })

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "index.html"))
    if (process.platform == 'darwin') mainWindow.setTouchBar(touchBar)

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', function() {
    app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.