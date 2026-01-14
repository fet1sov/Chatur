import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import ChatServer from './backend/ChatServer';

process.env.WS_NO_BUFFER_UTIL = '1';
process.env.WS_NO_UTF_8_VALIDATE = '1';

let expressServer : ChatServer = new ChatServer();

if (started) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.setMenu(null);

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }
};

async function startExpressServer() : Promise<void> {
  try {
    await expressServer.serveServer();
  } catch (error) {
    console.error('Failed to start Express server:', error);
  }
}

app.on('ready', async () => {
  await startExpressServer();
  createWindow();
});

ipcMain.handle('get-server-info', async () => {
  return expressServer.getServerInfo();
})

ipcMain.handle('set-chat-config', async () => {
  //return expressServer.setChatConfiguration();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});