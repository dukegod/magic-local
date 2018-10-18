/**
 * static serve
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const mimeTypes = {
  css: 'text/css',
  gif: 'image/gif',
  html: 'text/html',
  ico: 'image/x-icon',
  jpeg: 'image/jpeg'
};

const options = {
  port: 9999,
  root: '/',
  expire: true,
  etag: true,
  lastModifiec: true,
  gzip: true,
}

const hasTrailingSlash = url => url[url.length - 1] === '/';

class StaticServe {
  constructor(options = {}) {
    this.port = 9999;
    this.root = '';
    this.expire = true;
  }
  // 服务器启动
  serve(root) {
    this.root = root;
    http
      .createServer((req, res) => {
        this.router(root, req, res);
      })
      .listen(this.port, err => {
        if (err) {
          console.error(err);
          console.info('not get file');
        }
        console.info(`server run at port : ${this.port}`);
      });
  }
  /**
   * 路由处理
   * 根据是不是有'/'作为判断标识
   * */
  router(root, req, res) {
    console.log(`req url-- ${req.url}`);
    const pathName = path.join(root, path.normalize(req.url));
    console.log(`pathName--${pathName}`);

    fs.stat(pathName, (err, stat) => {
      if (!err) {
        const requestedPath = url.parse(req.url).pathname;
        if (hasTrailingSlash(requestedPath) && stat.isDirectory()) {
          this.responseDirectory(pathName, req, res);
        } else if (stat.isDirectory()) {
          this.responseRedirect(req, res);
        } else {
          this.responseFile(pathName, req, res);
        }
      } else {
        this.responseNotFound(err, res);
      }
    });
  }
  //  404
  responseNotFound(err, res) {
    // 处理favico文件
    if (err && err.path.indexOf('favicon.ico')) {
      // console.log(9);
      const favicon = new Buffer(
        'AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREQAAAAAAEAAAEAAAAAEAAAABAAAAEAAAAAAQAAAQAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAA//8AAP//AAD8HwAA++8AAPf3AADv+wAA7/sAAP//AAD//wAA+98AAP//AAD//wAA//8AAP//AAD//wAA',
        'base64'
      );
      // console.log(favicon)
      res.statusCode = 200;
      res.setHeader('Content-Length', favicon.length);
      res.setHeader('Content-Type', 'image/x-icon');
      res.end(favicon);
    } else {
      res.writeHead(404, {
        'Content-type': 'text/html'
      });
      res.end(`<h2> not Found </h2>`);
    }
  }
  // 处理文件系统
  responseFile(pathName, res) {
    const readStream = fs.createReadStream(pathName);
    res.setHeader('Content-Type', this.lookupMIMETypes(pathName));
    readStream.pipe(res);
  }
  // 处理目录文件
  responseRedirect(req, res) {
    const location = req.url + '/';
    res.writeHead(301, {
      Location: location,
      'Content-Type': 'text/html'
    });
    res.end(`Redirecting to <a href='${location}'>${location}</a>`);
  }

  response(pathName, req, res) {
    fs.stat(pathName, (err, stat) => {
      if (err) return this.responseError(err, res);

      this.responseFile(pathName, req, res);
      // this.setFreshHeaders(stat, res);
      // if (this.isFresh(req.headers, res._headers)) {
      //     this.responseNotModified(res);
      // } else {
      //     this.responseFile(stat, pathName, req, res);
      // }
    });
  }

  responseError(err, res) {
    res.writeHead(500);
    return res.end(err);
  }

  // 处理目录文件
  responseDirectory(pathName, req, res) {
    fs.readdir(pathName, (err, files) => {
      if (err) {
        this.responseError(err, res);
      }
      const requestPath = url.parse(req.url).pathname;
      let content = `<h1 style="color: blue">Index of ${requestPath}</h1>`;
      files.forEach(file => {
        let itemLink = path.join(requestPath, file);
        const stat = fs.statSync(path.join(pathName, file));
        if (stat && stat.isDirectory()) {
          itemLink = path.join(itemLink, '/');
        }
        content += `<p><a style="text-decoration: none" href='${itemLink}'>${file}</a></p>`;
      });
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(content);
    });
  }

  lookupMIMETypes(pathName) {
    let ext = path.extname(pathName);
    ext = ext.split('.').pop();
    return mimeTypes[ext] || mimeTypes['txt'];
  }
}

module.exports = new StaticServe();
