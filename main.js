'use strict';

const { app, BrowserWindow } = require('electron')
let win;

function createWindow() {
  win = new BrowserWindow({width: 1440, height: 900});
  win.loadFile('index.html');
  // win.webContents.openDevTools()
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow)

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
})
