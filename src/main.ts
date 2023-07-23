import { app, BrowserWindow, nativeTheme } from 'electron'

const createHomeWindow = () => {
    const window = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 500,
        icon: `${__dirname}/../public/assets/icon.ico`,
        webPreferences: {
            webviewTag: true,
            nodeIntegration: true,
            preload: `${__dirname}/preload.js`,
        },
    })
    window.setMenu(null)
    window.loadFile(`${__dirname}/../public/home.html`)
}

app.whenReady().then(() => {
    createHomeWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createHomeWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
