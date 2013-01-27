# ECTOR
A learning chatterbot in HTML / Javascript (ECTOR).

The browserified ([browserify](https://github.com/substack/node-browserify/)) version of [node-ector](https://github.com/parmentf/node-ector).

## Installation

### Get the files
Download the files: https://github.com/parmentf/browser-ector/archive/master.zip

Or clone the repository:
```bash
git clone https://github.com/parmentf/browser-ector.git
```

### Try it
Then, drag and drop file ``browser-ector/ector.html`` into your browser
(tested in Google Chrome 23, Firefox 18 and Chromium 20).

### Put it in another application
Import `js/bundle-ector.min.js`, `js/jquery-1.8.3.min.js`, `js/mustache.min.js`, and
`js/ector.js` into your HTML page.

Take a look at ``ector.js``, and adapt it to your web application.

The important part is:
```javascript
var Ector = require('ector');
ector = new Ector();

var previousResponseNodes = null;
ector.addEntry(entry);
ector.linkNodesToLastSentence(previousResponseNodes);
var response = ector.generateResponse();
console.log('%s: %s', ector.name, response.sentence);
previousResponseNodes = response.nodes;
```

You can customize your Ector, using its parameters:
```javascript
ector = new Ector('botname', 'username');
```
or using `setUser` method:
```javascript
ector.setUser('newName');
```

## Demonstration

You can take a look at the example page, and [talk to
ECTOR](http://parmentf.github.com/browser-ector/ector.html) (name it `ECTOR`,
it will recognize its name).

At this moment, your name is `Guy`, guy. OK?

## Release History
* 2013/01/27: version 0.1.6: update to ector 0.1.6 (bug fixes)
* 2013/01/17: version 0.1.5: update to ector 0.1.4 (bug fixes)
* 2013/01/11: version 0.1.4: change your name
* 2013/01/09: version 0.1.3: add save/load in the example
* 2013/01/09: version 0.1.2: fix Firefox's version
* 2013/01/08: version 0.1.0: first release

## License
Copyright (c) 2013 François Parmentier <francois.parmentier@gmail.com>
Licensed under the MIT license.
