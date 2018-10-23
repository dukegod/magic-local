#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const path = require('path');

const package = require('../libs/package-version');
const computerInfo = require('../libs/computer-info');
const staticServe = require('../libs/static-serve');

// console.log(path.dirname(__filename))

program
  .option('-V, --version', 'version', exeVersion)
  .option('-I, --info', 'computer information', exeInfo)
  .option('-r, --root <root>', 'specify the root directory []', String, './')
  .option('-p, --port <port>', 'specify the poor', Number, 9999)
  .on('--help', function() {
    console.log('   static serve Examples:');
    console.log('     ssv ./ -p 1234');
    console.log('     ssv -I(--info), print computer information');
    console.log('     ssv -V(--version), version');
  })
  .parse(process.argv);

// 处理输入的参数校验
const arg = process.argv;
if (arg && arg.length <=2) {
  program.help()
}

if (arg && arg.length > 2 && arg[2].indexOf('/') !== -1) {

    // 初始化服务器
    new staticServe({
      root: path.resolve(program.root),
      port: program.port
    });
}

// 输出版本信息
function exeVersion() {
  console.log(package.version);
}
// 输出os相关的信息
function exeInfo() {
  for (const key in computerInfo) {
    if (computerInfo.hasOwnProperty(key) && key !== 'para') {
      const element = `${chalk.red(key)} : ${computerInfo[key]}`;
      console.log(element);
    }
  }
}
