/**
* @file app
* @author leon <ludafa@outlook.com>
*/

import {app} from 'electron';
import {window} from './actions';
import menu from './menu';
import './devtools';
import protocol from './protocol';

app.setName('Timecraft');

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    menu();
    protocol();
    window.create().focusOnWebView();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (!window.getCount()) {
        window.create();
    }
});

// app.commandLine.appendSwitch('remote-debugging-port', '8315');
// app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1');

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
