// 'use strict';

// var app = require('app');  // Module to control application life.
// var BrowserWindow = require('browser-window');  // Module to create native browser window.

// // Keep a global reference of the window object, if you don't, the window will
// // be closed automatically when the JavaScript object is garbage collected.
// var mainWindow = null;

// // Quit when all windows are closed.
// app.on('window-all-closed', function() {
//   // On OS X it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform != 'darwin') {
//     app.quit();
//   }
// });

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// app.on('ready', function() {
//   // Create the browser window.
//   mainWindow = new BrowserWindow({width: 1000, height: 625});

//   // and load the index.html of the app.
//   mainWindow.loadURL('file://' + __dirname + '/index.html');

//   // Emitted when the window is closed.
//   mainWindow.on('closed', function() {
//     // Dereference the window object, usually you would store windows
//     // in an array if your app supports multi windows, this is the time
//     // when you should delete the corresponding element.
//     mainWindow = null;
//   });
// });
'use strict';
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var defaultMenu = require('electron-default-menu');
var Menu = require('menu');
var dialog = require('dialog');

let mainWindow;

function createWindow(){
  var template = [{
    label: 'Button one',
    position: 'endof=1',
    submenu: [{
      label: 'submenu button one',

      accelerator: 'CmdOrCtrl+z',
      
      click: function(item, focusedWindow){
        dialog.showMessageBox({message: 'submenu one', buttons:['OK']});
      }
    },{
      type: 'separator'
    },{
      label: 'Quit button',
      accelerator: 'Cmd+qOrCtrl+q',
      role: 'Quit'
    }]
  },{
    label: 'View',
    submenu:[{
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click: function(item, focusedWindow){
        if(focusedWindow){
          focusedWindow.reload();
        }
      }
    },{
      label: 'Full Screen', 
      accelerator: (function(){
        if(process.platform == 'darwin'){
          return 'Ctrl+Command+F';
        }
        else {
          return 'F11';
        }
      })(),
      click: function(item, focusedWindow){
        if(focusedWindow){
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      }
    },{
      label: 'Toggle Developer Tools',
      accelerator: (function(){
        if(process.platform == 'darwin'){
          return 'Alt+Command+I';
        }
        else {
          return 'Ctrl+Shift+I';
        }
      })(),
      click: function(item, focusedWindow){
        if(focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    }]
  },{

  }]

  mainWindow = new BrowserWindow({width: 1000, height: 625});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function(){
    mainWindow = null;
  });
  // var menu = defaultMenu();
  // menu.splice(1, 6, {
  //   label: 'TEST',
  //   submenu: [{
  //     label: 'button one', 
  //     click: function(item, focusedWindow){
  //       dialog.showMessageBox({message: 'hello world', buttons:['OK']});
  //     }
  //   }]
  // });
  Menu.setApplicationMenu(Menu.buildFromTemplate(template ));
}
function allClosed(){
  if(process.platform !== 'darwin'){
    app.quit();
  }
}
function activate(){
  if(mainWindow === null){
    createWindow();
  }
}
app.on('ready', createWindow);
app.on('window-all-closed', allClosed);
app.on('activate', activate);
