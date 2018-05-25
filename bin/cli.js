#!/usr/bin/env node

const program = require('commander');
const path = require('path');

const package = require('../libs/package-version');
const computerInfo = require('../libs/parse-args');
const sever = require('../libs/serve');

// console.log(path.dirname(__filename))

program
  .option('-V, --version', 'version', exeVersion)
  .option('-I, --info', 'information', exeInfo)
  .option('-r, --root <root>', 'specify the root directory []', String, '')
  .on('--help', function() {
    //这里输出子命令的帮助
    console.log('Examples:');
    console.log('运行方法：');
    console.log('ssever ./');
  })
  .parse(process.argv);

//  帮助文档
// console.log('文件目录', computerInfo.para);

if (!computerInfo.para) {
  program.help();
}

if (computerInfo.para.indexOf('./') !== -1) {
  // 获取路径信息
  let staticpath = path.resolve(program.args.shift() || '.');
  staticpath = staticpath + '/' + program.root;
  console.log('获取路径信息', staticpath);
  sever(staticpath);
}

// 输出版本信息
function exeVersion() {
  console.log(package.version);
  // return package.version
}

function exeInfo() {
  console.log(computerInfo);
  // return computerInfo
}
