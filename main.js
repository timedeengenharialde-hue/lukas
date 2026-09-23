// Widget flutuante do Windows (Electron)
const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain, screen } = require('electron');
const path = require('path');

const APP_ID = 'br.lukas.monitordemandas'; // igual ao build.appId (necessário para as notificações do Windows)
let win, tray;

app.setAppUserModelId(APP_ID);
if (!app.requestSingleInstanceLock()) app.quit();
app.on('second-instance', () => { if (win) { win.show(); win.focus(); } });

function createWindow() {
  const { workArea } = screen.getPrimaryDisplay();
  const w = 380, h = 560;
  win = new BrowserWindow({
    width: w, height: h,
    x: workArea.x + workArea.width - w - 16,
    y: workArea.y + workArea.height - h - 16,
    frame: false, transparent: true, resizable: false,
    alwaysOnTop: true, skipTaskbar: true, show: false,
    webPreferences: { preload: path.join(__dirname, 'preload.js') }
  });
  win.setAlwaysOnTop(true, 'floating');
  win.loadFile(path.join(__dirname, 'www', 'index.html'));
  win.once('ready-to-show', () => win.show());
  win.on('close', (e) => { if (!app.isQuitting) { e.preventDefault(); win.hide(); } });
}

function createTray() {
  const icon = nativeImage.createFromPath(path.join(__dirname, 'build', 'icon.png')).resize({ width: 16, height: 16 });
  tray = new Tray(icon);
  tray.setToolTip('Monitor de Demandas');
  const menu = () => Menu.buildFromTemplate([
    { label: 'Mostrar / ocultar', click: toggle },
    { label: 'Iniciar com o Windows', type: 'checkbox', checked: app.getLoginItemSettings().openAtLogin,
      click: (i) => app.setLoginItemSettings({ openAtLogin: i.checked }) },
    { type: 'separator' },
    { label: 'Sair', click: () => { app.isQuitting = true; app.quit(); } }
  ]);
  tray.setContextMenu(menu());
  tray.on('click', toggle);
}

function toggle() { if (win.isVisible()) win.hide(); else { win.show(); win.focus(); } }

// A página pede para a janela ter o tamanho do conteúdo (mantém o canto superior direito fixo)
ipcMain.on('fit', (_e, size) => {
  const b = win.getBounds();
  const w = Math.ceil(size.w), h = Math.ceil(size.h);
  win.setBounds({ x: b.x + b.width - w, y: b.y, width: w, height: h });
});
ipcMain.on('show', () => { win.show(); win.focus(); });

app.whenReady().then(() => { createWindow(); createTray(); });
app.on('window-all-closed', (e) => e.preventDefault());
