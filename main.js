const {app, Tray, Menu, BrowserWindow, globalShortcut} = require('electron')
const url = require("url");
const path = require("path");

const iconPath = path.join(__dirname, 'assets/YoutubeMusic.png');
let appIcon = null;
let AboutUs
let Help

function showHelp () {
  // Crea la ventana del navegador.
  Help = new BrowserWindow({
    icon:'assets/YoutubeMusic.png',
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  Help.loadFile('html/help.html')
  Help.removeMenu();



  Help.on('closed', function () {
    Help = null
  })
}

function showAboutUs () {
  // Crea la ventana del navegador.
  AboutUs = new BrowserWindow({
    icon:'assets/YoutubeMusic.png',
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  AboutUs.loadFile('html/AboutUs.html')
  AboutUs.removeMenu()



  AboutUs.on('closed', function () {
    AboutUs = null
  })
}


app.on('ready', () => {
  globalShortcut.register('CommandOrControl+I', () => {
    console.log('CommandOrControl+I is pressed')
    mainWindow.show();
  })
})


app.on('ready', () => {
  globalShortcut.register('CommandOrControl+K', () => {
    console.log('CommandOrControl+K is pressed')
    mainWindow.hide();
  })
})

app.on('ready', () => {
  globalShortcut.register('mediaprevioustrack', () => {
    console.log('PreviousTrack is pressed')
    //ks.sendCombination(['shift', 'p']);
  })
})

app.on('ready', () => {
  globalShortcut.register('mediaplaypause', () => {
    console.log('PlayPause is pressed')
    //ks.sendKey(['space']);
    //document.getElementById('play-pause-button').click();
  })
})

app.on('ready', () => {
  globalShortcut.register('medianexttrack', () => {
    console.log('NextTrack is pressed')
    //ks.sendCombination(['shift', 'n']);
    //document.getElementById('id').click();

  })
})

app.on('ready', function() {
  win = new BrowserWindow({})
  appIcon = new Tray(iconPath);
  win.hide();
  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'Minimize',
      accelerator: 'Ctrl+K',
      click: function() {
        mainWindow.hide();
      }
    },
    {
      label: 'Show',
      accelerator: 'Ctrl+I',
      click: function() {
        mainWindow.show();
      }
    },
    /*
    {
      label: 'Refresh',
      accelerator: 'Ctrl+R',
      click: function() {
        mainWindow.show();
      }
    },
    {
      label: '2',
      submenu: [
        { label: 'submenu1'},
        { label: 'submenu2'}
      ]
    },
    */
    {
      label: 'Toggle FullScreen',
      accelerator: 'F11',
      //type: 'radio',
      click: function() {
        mainWindow.setFullScreen(true)
      }
    },
    /*
    {
        label: 'Enable Frameless',
        //type: 'radio',
        click: function() {
          mainWindow.frame(false)
        }
      },
      {
        label: 'Disable Frameless',
        //type: 'radio',
        click: function() {
          mainWindow.frame(true)
        }
      },*/
    /*
    {
      label: 'Toggle DevTools',
      accelerator: 'Ctrl+D',
      click: function() {
        win.show();
        win.toggleDevTools();
      }
    },
    */
   {
    label: 'About Us',
    click: function() {
      showAboutUs();
    }
    },
    {
      label: 'Help',
      click: function() {
        showHelp();
      }
      },
    {
    label: 'Quit',
    accelerator: '',
    click: function() {
      app.isQuiting = true;
      app.quit();
    }
    }
  ]);
  appIcon.setToolTip("Youtube Music Desktop version.");
  appIcon.setContextMenu(contextMenu);
});

let mainWindow
//var BrowserWindow = require('browser-window')
function createWindow () {
  mainWindow = new BrowserWindow({
    icon:'assets/YoutubeMusic.png',
    width: 1200,
    height: 800,
    frame: true,
    webPreferences: {
      nodeIntegration: true
    },
    //icon: __dirname + 'YoutubeMusic.png'

  })

  mainWindow.loadURL('https://music.youtube.com');
  mainWindow.removeMenu();

  /*
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `https://music.youtube.com`),
      protocol: "file:",
      slashes: true
    })
  );
  */

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })

}



app.on('ready', showAboutUs)
app.on('ready', showHelp)

app.on('ready', function () {
  Help.hide();
})

app.on('ready', function () {
  AboutUs.hide();
})

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
