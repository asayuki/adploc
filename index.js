const path = require('path');
const electron = require('electron');
const { app, BrowserWindow, Tray } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
    // Our main window
    mainWindow = new BrowserWindow({
        height: 500,
        width: 300,
        frame: false,
        resizable: false,
        show: false
    });
    mainWindow.loadURL(`file://${__dirname}/src/views/index.html`);

    // Gather ze icons
    const iconName = process.platform === 'win32' ? 'icon.png' : 'icon.png'; // Add another icon?
    const iconPath = path.join(__dirname, `./src/icons/${iconName}`);

    // ze tray
    let tray = new Tray(iconPath);
    tray.on('click', (event, bounds) => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
            return;
        }

        const { x, y } = bounds;
        const { height, width } = mainWindow.getBounds();
        const yPosition = process.platform === 'darwin' ? y : y - height;
        
        mainWindow.setBounds({
            x: x - width / 2,
            y: yPosition,
            height,
            width
        });
        mainWindow.show();
    });
});