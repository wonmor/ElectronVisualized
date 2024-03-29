const { app, BrowserWindow, screen: electronScreen } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

// How to get provisioning profiles for macOS distribution: https://webspaceteam.com/blog/how-to-publish-an-electron-application-to-mac-app-store
// Run the following command to build an universal app: yarn electron-builder --universal

const createMainWindow = () => {
  let mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    show: false,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: false,
      devTools: isDev
    }
  });
  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startURL);

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    mainWindow.loadURL(url);
  });
};

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});