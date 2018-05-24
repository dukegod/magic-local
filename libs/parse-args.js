/**
 * 解析字符串
 */
const computerInfo = {
  uptime: process.uptime(),
  nodeVersion: process.version,
  platform: process.platform,
  memoryUsage: process.memoryUsage(),
  para: process.argv.slice(2)[0],
}

module.exports = computerInfo;


