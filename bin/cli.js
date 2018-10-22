#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const path = require('path');

const package = require('../libs/package-version');
const computerInfo = require('../libs/computer-args');
const staticServe = require('../libs/static-serve')

// console.log(path.dirname(__filename))

program
  .option('-V, --version', 'version', exeVersion)
  .option('-I, --info', 'computer information', exeInfo)
  .option('-r, --root <root>', 'specify the root directory []', String, './')
  .option('-p, --port <port>', 'specify the poor', Number, 9999)
  .on('--help', function() {
    //这里输出子命令的帮助
    console.log('Examples:');
    console.log('ssever -r ./ -p 1234');

  })
  .parse(process.argv);


  // console.log(process.argv)

  // console.log(computerInfo.para);

  // console.log(program.root)
  // console.log(program.port)

// if (!computerInfo.para) {
//   // program.help();
//   let staticpath = path.resolve(program.args.shift() || '.');
//   staticpath = staticpath + '/' + program.root;
//   // console.log('获取路径信息', staticpath);
//   // sever(staticpath);
//   // console.log(ssver.serve);
//   staticServe.serve(staticpath)
// }




// if (computerInfo.para.indexOf('./') !== -1) {
//   // 获取路径信息
//   let staticpath = path.resolve(program.args.shift() || './');
//   staticpath = staticpath + '/' + program.root;
//   console.log('path', staticpath);
//   // staticServe.serve(staticpath)
// }

console.log(staticServe);

// staticServe({
//   root: program.root,
//   port: program.port
// })




// 输出版本信息
function exeVersion() {
  console.log(package.version);
}
// 输出os相关的信息
function exeInfo() {
  for (const key in computerInfo) {
    if (computerInfo.hasOwnProperty(key)&& key!== 'para') {
      const element = `${chalk.red(key)} : ${computerInfo[key]}`;
      console.log(element)
    }
  }
}
