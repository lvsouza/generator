import { app, nativeImage, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: Electron.BrowserWindow | null;

const createWindow = () => {
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
    hasShadow: true,
    vibrancy: 'dark',
    transparent: true,
    maximizable: true,
    autoHideMenuBar: true,
    fullscreenable: false,
    backgroundColor: '#1e1e1e',
    webPreferences: {
      devTools: process.env.NODE_ENV === 'development',
      defaultFontFamily: { sansSerif: 'Roboto' },
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

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', () => {
  createWindow();
});

app.allowRendererProcessReuse = true;
