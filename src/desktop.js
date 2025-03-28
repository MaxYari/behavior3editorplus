const { app, BrowserWindow, ipcMain, dialog, crashReporter, globalShortcut } = require('electron');

const path = require('path')

// Report crashes to our server.
// crashReporter.start({ uploadToServer: false });

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
  // Ipc event for openning a dialogue windows
  // ipcMain.handle('dialog', (event, method, params) => {
  //   dialog[method](params);
  // });

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1400, height: 900,
    frame: false, // Disable default window frame
    icon: __dirname + "/imgs/favicon.ico",
    /* You can use *titleBarOverlay: true* to use the original Windows controls */
    // titleBarOverlay: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });


  // and load the index.html of the app.
  // mainWindow.loadFile('index.html');
  mainWindow.loadURL('file://' + __dirname + '/index.html');


  // Open the DevTools.
  //mainWindow.openDevTools();
  mainWindow.webContents.on('new-window', function (e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

// Register a shortcut to open DevTools
app.on('browser-window-focus', () => {
  globalShortcut.register('Ctrl+Shift+I', () => {
    mainWindow.webContents.toggleDevTools();
  });
});

app.on('browser-window-blur', () => {
  globalShortcut.unregister('Ctrl+Shift+I');
});

