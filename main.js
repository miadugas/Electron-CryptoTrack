
// Electron QUICKSTART CODE
// necessary variables for Electron
const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')

//lauch a natrual browser window for CoinMarketCap
const shell = require('electron').shell

//Collects & sends all the processes out to our windows as needed
const ipc = require('electron').ipcMain

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

  // on macOS its common for apps & the menu bar to stay active until the user quits with CMD+Q
if (process.platform !== 'darwin') {
    app.quit()
}
})

// final section simply sets win = null when the app has been closed.
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
if (win === null) {
    createWindow()
}
})

// ABOVE CODE REQUIRED TO RUN ELECTRON
// END QUICKSTART CODE

//method used to catch the message from the add.html file & sends back to index.html 
//calls ipc renderer from our add.html file
ipc.on('update-notify-value', function(event, arg) {
win.webContents.

//sends my target price value win which is bound to my index.html file
send('targetPriceVal', arg)
})