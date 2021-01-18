const { app, BrowserWindow ,Menu} = require('electron')
let win;
var platform = process.platform;
var alert=require('alert');


Menu.setApplicationMenu(false);
function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
    nativeWindowOpen: true,
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  // win.webContents.openDevTools();
  
  
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
