
//electron required
const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', function(event) {
    
     //to close the link that the window is on
    var window = remote.getCurrentWindow();
    window.close()
})

const updateBtn = document.getElementById('updateBtn')

updateBtn.addEventListener('click', function() {
    ipc.send('update-notify-value', document.getElementById('notifyVal').value)

     //close window once submitted
    var window = remote.getCurrentWindow();
    window.close()
})