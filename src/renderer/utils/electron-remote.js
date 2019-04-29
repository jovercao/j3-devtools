import { remote } from 'electron'

export function showOpenDialog(options) {
  return new Promise((resolve) => {
    remote.dialog.showOpenDialog(options, function(filePaths) {
      resolve(filePaths)
    })
  })
}
