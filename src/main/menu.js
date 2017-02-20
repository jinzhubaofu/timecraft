/**
 * @file menu
 * @author leon <ludafa@outlook.com>
 */

const {app, Menu} = require('electron');
const actions = require('./actions');

module.exports = function () {

    const template = [
        {
            label: app.getName(),
            submenu: [
                {
                    role: 'about'
                },
                {
                    role: 'quit'
                }
            ]
        },
        {
            label: 'File',
            submenu: [
                {
                    label: 'New',
                    accelerator: 'CmdOrCtrl+N',
                    click: actions.file.create
                },
                {
                    label: 'Open...',
                    accelerator: 'CmdOrCtrl+O',
                    click: actions.file.open
                },
                {
                    label: 'Save',
                    sublabel: 'test',
                    accelerator: 'CmdOrCtrl+S',
                    click: actions.file.save
                },
                {
                    type: 'separator'
                },
                {
                    role: 'close'
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    role: 'undo'
                },
                {
                    role: 'redo'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'cut'
                },
                {
                    role: 'copy'
                },
                {
                    role: 'paste'
                },
                {
                    role: 'pasteandmatchstyle'
                },
                {
                    role: 'delete'
                },
                {
                    role: 'selectall'
                }
            ]
        },
        {
            label: 'Window',
            submenu: [
                {
                    role: 'reload'
                }
            ]
        }
    ];

    // const template = [
    //     {
    //         label: 'Edit',
    //         submenu: [
    //             {
    //                 role: 'undo'
    //             },
    //             {
    //                 role: 'redo'
    //             },
    //             {
    //                 type: 'separator'
    //             },
    //             {
    //                 role: 'cut'
    //             },
    //             {
    //                 role: 'copy'
    //             },
    //             {
    //                 role: 'paste'
    //             },
    //             {
    //                 role: 'pasteandmatchstyle'
    //             },
    //             {
    //                 role: 'delete'
    //             },
    //             {
    //                 role: 'selectall'
    //             }
    //         ]
    //     },
    //     {
    //         label: 'View',
    //         submenu: [
    //             {
    //                 role: 'reload'
    //             },
    //             {
    //                 role: 'toggledevtools'
    //             },
    //             {
    //                 type: 'separator'
    //             },
    //             {
    //                 role: 'resetzoom'
    //             },
    //             {
    //                 role: 'zoomin'
    //             },
    //             {
    //                 role: 'zoomout'
    //             },
    //             {
    //                 type: 'separator'
    //             },
    //             {
    //                 role: 'togglefullscreen'
    //             }
    //         ]
    //     },
    //     {
    //         role: 'window',
    //         submenu: [
    //             {
    //                 role: 'minimize'
    //             },
    //             {
    //                 role: 'close'
    //             }
    //         ]
    //     }
    // ];
    //
    // if (process.platform === 'darwin') {
    //     template.unshift({
    //         label: app.getName(),
    //         submenu: [
    //             {
    //                 role: 'about'
    //             },
    //             {
    //                 type: 'separator'
    //             },
    //             {
    //                 role: 'services',
    //                 submenu: []
    //             },
    //             {
    //                 type: 'separator'
    //             },
    //             {
    //                 role: 'hide'
    //             },
    //             {
    //                 role: 'hideothers'
    //             },
    //             {
    //                 role: 'unhide'
    //             },
    //             {
    //                 type: 'separator'
    //             },
    //             {
    //                 role: 'quit'
    //             }
    //         ]
    //     });
    //     // Edit menu.
    //     template[1].submenu.push(
    //         {
    //             type: 'separator'
    //         },
    //         {
    //             label: 'Speech',
    //             submenu: [
    //                 {
    //                     role: 'startspeaking'
    //                 },
    //                 {
    //                     role: 'stopspeaking'
    //                 }
    //             ]
    //         }
    //     );
    //     // Window menu.
    //     template[3].submenu = [
    //         {
    //             label: 'Close',
    //             accelerator: 'CmdOrCtrl+W',
    //             role: 'close'
    //         },
    //         {
    //             label: 'Minimize',
    //             accelerator: 'CmdOrCtrl+M',
    //             role: 'minimize'
    //         },
    //         {
    //             label: 'Zoom',
    //             role: 'zoom'
    //         },
    //         {
    //             type: 'separator'
    //         },
    //         {
    //             label: 'Bring All to Front',
    //             role: 'front'
    //         }
    //     ];
    // }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};
