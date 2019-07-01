"use strict";
/**
 * 解析字符串
 */
var os = require('os');
var utils_1 = require("./utils");
var computerInfo = {
    hostname: os.hostname(),
    platform: os.platform(),
    uptime: utils_1.secondToDay(os.uptime()),
    totalmem: utils_1.byteToMb(os.totalmem()),
    freemen: utils_1.byteToMb(os.freemem()),
    cups: os.cpus() ? os.cpus()[0].model : 1,
    cupsNumber: os.cpus() ? os.cpus().length : 1,
    localhost: os.networkInterfaces().lo0 ? os.networkInterfaces().lo0[0].address : '',
    interhost: os.networkInterfaces().en0 ? os.networkInterfaces().en0[1].address : '',
    pid: process.pid,
    nodeVersion: process.version,
};
module.exports = computerInfo;
