#!/usr/bin/env node
const fs = require('fs');
// const define = require('../package.json')
const esbuild = require('esbuild');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { createServer, request } = require('http');
const { spawn } = require('child_process');
const argv = yargs(hideBin(process.argv))
  .alias('a', 'assetsPath')
  .alias('d', 'dir')
  .alias('f', 'format')
  .options({
    room: {
      type: 'string',
    },
    prd: {
      type: 'boolean',
      describe: 'build for production',
    },
    inline: {
      type: 'boolean',
      describe: 'inline worker js and wasm',
    },
  }).parse();
const config = {
  define: {
    useWt: argv.ws ? 'false' : 'true',
    assetsPath: `'${argv.assetsPath || ""}'`
  },
  platform: 'browser',
  bundle: true,
  format: (argv.format === 'umd' ? 'iife' : argv.format) || 'esm',
  target: 'es2017',
  metafile: true,
  sourcemap: !argv.prd,
  minify: argv.prd,
  watch: argv.prd ? false : { onRebuild: onBuild },
  entryPoints: ['src/main.ts'],
  tsconfig: './tsconfig.json',
  globalName: "AIKit",
  outfile: `${argv.dir || 'dist'}/ai-kit.js`
};


const clients = [];
let waitBuildResolve = null;
let isBuilding = false;

function waitBuildSuccess() {
  return new Promise((resolve) => {
    if (isBuilding) {
      waitBuildResolve = resolve;
    } else { resolve(); }
  });
}

function onBuild(error) {
  if (error instanceof Error) console.error('build failed:', error);
  else {
    if (error && error.metafile) esbuild.analyzeMetafile(error.metafile, {
      verbose: true
    }).then(console.log);
    isBuilding = true;
    console.log('build succeeded');
    clients.forEach((res) => res.write('data: update\n\n'));
    clients.length = 0;
    if (argv.format === 'iife') {
      const s = fs.readFileSync(config.outfile, 'utf8');
      const lastSemi = s.lastIndexOf(';');
      fs.writeFileSync(config.outfile, s.substring(0, lastSemi) + '.default' + s.substring(lastSemi));
      if (waitBuildResolve) {
        waitBuildResolve();
        waitBuildResolve = null;
      };
      isBuilding = false;
    }
  }
}
esbuild.build(config).then(onBuild, onBuild);

esbuild.serve({ port: 8888, servedir: '../dist' }, {}).then(() => {
  createServer(async (req, res) => {
    const { url, method, headers } = req;
    if (req.url === '/esbuild')
      return clients.push(
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        })
      );
    await waitBuildSuccess();
  }).listen(9988);
});