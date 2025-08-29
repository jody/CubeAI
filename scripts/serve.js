#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = Number(process.env.PORT) || 8080;
const root = process.cwd();

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.wasm': 'application/wasm'
};

function safePath(urlPath) {
  const decoded = decodeURI(urlPath.split('?')[0]);
  const clean = path.normalize(decoded).replace(/^\/+/, '');
  const full = path.join(root, clean || 'index.html');
  if (!full.startsWith(root)) return null; // path traversal guard
  return full;
}

const server = http.createServer((req, res) => {
  const filePath = safePath(req.url);
  if (!filePath) {
    res.writeHead(400).end('Bad Request');
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isDirectory()) {
      // Serve index.html for directories
      return serveFile(path.join(filePath, 'index.html'), res, true);
    }
    if (!err && stat.isFile()) {
      return serveFile(filePath, res);
    }
    // SPA fallback to index.html on 404 for HTML requests
    const acceptsHTML = (req.headers['accept'] || '').includes('text/html');
    if (acceptsHTML || !path.extname(filePath)) {
      return serveFile(path.join(root, 'index.html'), res, true);
    }
    res.writeHead(404).end('Not Found');
  });
});

function serveFile(fp, res, isFallback = false) {
  fs.readFile(fp, (err, data) => {
    if (err) {
      if (isFallback) return res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}).end('<!doctype html><title>SPA</title>');
      return res.writeHead(404).end('Not Found');
    }
    const ext = path.extname(fp).toLowerCase();
    const type = types[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type }).end(data);
  });
}

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Static server running at http://localhost:${port}`);
});

