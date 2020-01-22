

// Electron QUICKSTART CODE
// necessary variables for Electron
const {app, BrowserWindow, Menu} = require('../Electron-CryptoTrack/src/node_modules/electron')
const path = require('path')
const url = require('url')

//lauch a natrual browser window for CoinMarketCap
const shell = require('../Electron-CryptoTrack/src/node_modules/electron').shell

//Collects & sends all the processes out to our windows as needed
const ipc = require('../Electron-CryptoTrack/src/node_modules/electron').ipcMain

//global reference of the window object that will be created. Will be closed automatically when the JavaScript object is garbage collected.
let win


//defines the actual application window that will be loaded once a user runs the application. 
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

 // and load the index.html of the app via the path.
  win.loadURL(url.format({

    // path of template
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools so we can debug the app, not vital & can comment out if not needed
  win.webContents.openDevTools()

// Emitted when the window is closed.
// Garabge cleanup
  win.on('closed', () => {

// Dereference the window object, usually you would store windows
// in an array if the app supports multi window this is the time to delete the corresponding element.
    win = null
  })

  //build a simple custom menu with a few submenus
  var menu = Menu.buildFromTemplate([
      {
          label: 'Menu',
          submenu: [
                {label: 'Adjust Notification Value'},
                {
                    label: 'CoinMarketCap',
                    click() {
                        shell.openExternal('http://coinmarketcap.com')
                    }
                },
//nice little separator in the submenu items
{type: 'separator'},
{
    //Dev info to website
    label: 'Developer Info',
    click() {
        shell.openExternal('http://miadugas.com')
    }
},

  //nice little separator in the submenu items
                {type: 'separator'},
                {

                  //Shutdown the app
                    label: 'Exit',
                    click() {
                        app.quit()
                    }
                }
          ]
      },
      {
          label: 'Info'
      }
  ])

  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

ipc.on('update-notify-value', function(event, arg) {
  win.webContents.send('targetPriceVal', arg)
})