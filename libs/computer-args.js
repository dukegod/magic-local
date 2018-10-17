/**
 * 解析字符串
 */
const os = require('os')
const secondToDay = require('./utils').secondToDay
const byteToMb = require('./utils').byteToMb

const computerInfo = {
  hostname: os.hostname(),
  platform: os.platform(),
  uptime: secondToDay(os.uptime()),
  totalmem: byteToMb(os.totalmem()),
  freemen: byteToMb(os.freemem()),
  cups: os.cpus()[0].model,
  cupsNumber: os.cpus().length,
  localhost: os.networkInterfaces().lo0[0].address,
  interhost: os.networkInterfaces().en0[1].address,
  pid: process.pid,
  nodeVersion: process.version,
  para: process.argv.slice(2)[0],
}

module.exports = computerInfo;


