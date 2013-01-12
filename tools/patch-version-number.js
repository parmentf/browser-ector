#!/usr/bin/env node
/*jshint node:true */
/**
 * Script in charge of patch the pfc's version number into differents files
*/
"use strict";

var fs = require('fs');
var argv = require('optimist').argv;
var glob = require('glob');
var version = argv.version; 

if (/^[0-9]\.[0-9]+\.[0-9]+$/.test(version)) {
  
  var c = '';
  
  // package.json: "version": "2.0.3",
  c = fs.readFileSync('package.json', 'utf8');
  c = c.replace(/[0-9]\.[0-9]+\.[0-9]+/, version);
  fs.writeFileSync('package.json', c, 'utf8');  
  
  // README.md: phpfreechat-2.0.0
  glob.sync(__dirname + '/../doc/*.md').forEach(function (docf) {
    c = fs.readFileSync(docf, 'utf8');
    c = c.replace(/ browser-ector-[0-9]\.[0-9]+\.[0-9]+/g, ' browser-ector-' + version); // in text
    fs.writeFileSync(docf, c, 'utf8');  
    process.stdout.write(docf + ' patched\n');
  });
  
} else {
  process.stderr.write('Wrong version format (should be n.n.n)\n');
}