import {
  app,
  Menu,
  shell,
  nativeImage,
  BrowserWindow,
  MenuItemConstructorOptions
} from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  const icon = nativeImage.createFromPath(`${app.getAppPath()}/build/icon.png`);

  if (app.dock) {
    app.dock.setIcon(icon);
  }

  mainWindow = new BrowserWindow({
    icon,
    frame: false,
    minWidth: 600,
    minHeight: 400,
    resizable: true,
    darkTheme: true,
    vibrancy: 'dark',
    transparent: true,
    maximizable: true,
    autoHideMenuBar: true,
    backgroundColor: '#1e1e1e',
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000');
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  mainWindow.on('close', () => {
    /* setWindowBounds(mainWindow?.getBounds()) */
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function createMenu() {
  const template: MenuItemConstructorOptions[] = [
    {
      label: 'Generator',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: () => {
            shell.openExternal('https://github.com/lvsouza/generator');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.on('ready', () => {
  createWindow();
  createMenu();
});

app.allowRendererProcessReuse = true;
