'use strict';

const { app, BrowserWindow, Menu } = require('electron');
let win;

function createWindow() {
  win = new BrowserWindow({ width: 1440, height: 900 });
  win.loadFile('index.html');
  // win.webContents.openDevTools()
  win.on('closed', () => {
    win = null;
  });
}

function createMenu() {
  var menu = Menu.buildFromTemplate([
    {
      label: 'Paper',
      submenu: [
        { role: 'quit' },
      ],
    },
    { role: 'editMenu' },
    { role: 'windowMenu' },
  ]);
  Menu.setApplicationMenu(menu);
};

app.on('ready', function () {
  createWindow();
  createMenu();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('web-contents-created', function (webContentsCreatedEvent, contents) {
  if (contents.getType() === 'webview') {
    contents.on('new-window', function (newWindowEvent, url) {
      // console.log('block');
      newWindowEvent.preventDefault();
    });
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});
