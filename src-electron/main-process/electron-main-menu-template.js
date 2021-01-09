import {app} from 'electron'
import {mainWindow} from './electron-main'

const isMac = process.platform === 'darwin'
export const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [
        {
            label: 'Settings',
            accelerator: process.platform === 'darwin' ? 'Alt+Cmd+s' : 'Alt+Shift+s',
            click(){
                mainWindow.webContents.send('show-settings')
            }
        },
        ...isMac ? [{ role: 'close' }] : [{ role: 'quit' }]
        
      ]
    },
    // { role: 'editMenu' }
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac ? [
          { role: 'pasteAndMatchStyle' },
          { role: 'delete' },
          { type: 'separator' },
          {
            label: 'Speech',
            submenu: [
              { role: 'startspeaking' },
              { role: 'stopspeaking' }
            ]
          }
        ] : [
          { role: 'delete' },
        ])
      ]
    },
    // { role: 'viewMenu' }
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    // { role: 'windowMenu' }
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [
          { role: 'close' }
        ])
      ]
    },
    {
      role: 'help',
      submenu: [
        // {
        //   label: 'Learn More',
        //   click: async () => {
        //     const { shell } = require('electron')
        //     await shell.openExternal('https://electronjs.org')
        //   }
        // }
        {
            label: 'Information',
            accelerator: process.platform === 'darwin' ? 'Alt+Cmd+i' : 'Alt+Shift+i',
            click(){
                mainWindow.webContents.send('show-information')
            }
        }
      ]
    }
  ]