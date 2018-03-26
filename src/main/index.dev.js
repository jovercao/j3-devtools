/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */

import { app, BrowserWindow } from 'electron'

// Set environment for development
process.env.NODE_ENV = 'development'

// Install `electron-debug` with `devtron`
require('electron-debug')({ showDevTools: true })


// Install `vue-devtools`
app.on('ready', () => {

  BrowserWindow.addDevToolsExtension(require('path').resolve('devtools/vue-devtools'))
  // console.log('downloading `vue-devtools`.')
  // let installExtension = require('electron-devtools-installer')
  // installExtension.default(installExtension.VUEJS_DEVTOOLS)
  //   .then(() => {
  //     console.log('install `vue-devtools` success.')
  //   })
  //   .catch(err => {
  //     console.log('Unable to install `vue-devtools`: \n', err)
  //   })
})

// Require `main` process to boot app
require('./index')
