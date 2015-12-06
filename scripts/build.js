"use strict";
const _ = require('lodash');

function bundle(inFile, outFile, done) {
  const browserify = require('browserify');
  const fs = require('fs');
  const b = browserify();
  b.add(inFile);
  b.bundle()
   .pipe(fs.createWriteStream(outFile))
   .on('close', done);
}

const doBundle = _.debounce((done) => {
  bundle('./tsbuild/main.js', './build/js/script.js', done);
}, 500);

require("child_process")
  .exec('tsc --watch')
  .stdout
  .pipe(require('process').stdout);

require('watch').watchTree('./tsbuild', {interval: 400}, () => {
  doBundle(() => null)
});
