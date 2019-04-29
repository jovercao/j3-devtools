import { exec } from 'child_process'

export function readLogicalDisks() {
  return new Promise((resolve, reject) => {
    exec('wmic logicaldisk get caption', function(err, stdout, stderr) {
      if (err || stderr) {
        reject(new Error('root path open failed' + err + stderr))
        return
      }
      const list = stdout.trim().split('\n').slice(1).map(i => i.trim())
      resolve(list)
    })
  })
}
