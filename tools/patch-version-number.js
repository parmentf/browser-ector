#!/usr/bin/env node
/*jshint node:true */
/**
 * Script in charge of patch the pfc's version number into differents files
*/
"use strict";

var fs = require('fs');
var argv = require('optimist').argv;
var sugar = require('sugar'); // Number.pad()
var version = argv.version;

if (/^[0-9]\.[0-9]+\.[0-9]+$/.test(version)) {
  
  var c = '';
  
  // package.json: "version": "2.0.3",
  c = fs.readFileSync('package.json', 'utf8');
  c = c.replace(/[0-9]\.[0-9]+\.[0-9]+/, version);
  fs.writeFileSync('package.json', c, 'utf8');
  
  // README.md: ## Release History
  var d = new Date();
  c = fs.readFileSync('README.md', 'utf8');
  c = c.replace(/Release History\n/,
    "Release History\n" +
    "* " + d.getFullYear() + "/" +
    (d.getMonth()+1).pad(2) + "/" +
    (d.getDate()).pad(2) +
    ": version " + version +
    "\n");
  fs.writeFileSync('README.md', c, 'utf8');
  
} else {
  process.stderr.write('Wrong version format (should be n.n.n)\n');
}