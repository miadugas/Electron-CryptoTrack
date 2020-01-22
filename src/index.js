
//electron required
const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow

// installed as a dev dependency via: 
// npm install axious --save 
// now we can make a request
const axios = require('axios')
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn')

//updating ID's & tags in index.html
var price = document.querySelector('h1')
var targetPrice = document.getElementById('targetPrice')

//Desktop notification
var targetPriceVal

const notification = {
    title: 'BTC Alert',
    body: 'BTC just beat your target price!',
    icon: path.join(__dirname, '../assets/images/btc.png')
}

//Axios request to call the function on a time based interval
function getBTC() {

    //current price of ONE USD bitcoin
    //API documentaion https://min-api.cryptocompare.com/documentation
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then(res => {
            const cryptos = res.data.BTC.USD
            price.innerHTML = '$'+cryptos.toLocaleString('en')

              //The noticiation function
            if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
                const myNotification = new window.Notification(notification.title, notification)
            }

        })
}

//call to make the function run every 30 seconds
getBTC()
setInterval(getBTC, 10000);

//Notify button event listener
notifyBtn.addEventListener('click', function(event) {
    
     //grabs the add.html file
    const modalPath = path.join('file://', __dirname, 'add.html')

    //builds our small window
    let win = new BrowserWindow({ frame: false, 
        
    //make the small window transparent & always on top 
        transparent: true, alwaysOnTop: true, 
        
        //smaller window size
        width: 400, height: 200})
    
    //cleanup files
    win.on('close', function() { win = null })
    win.loadURL(modalPath)
    win.show()
})

ipc.on('targetPriceVal', function (event, arg) {
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en')
})