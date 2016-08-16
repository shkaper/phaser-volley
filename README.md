Phaser Volley - a tribute to Blobby Volley
---


Based on [Phaser ES6 Boilerplate](https://github.com/belohlavek/phaser-es6-boilerplate) template
and [Phaser](http://phaser.io/) framework.


Usage
---

You need [Node.js and npm](https://nodejs.org/).
Clone the repository (or download the ZIP file)

`git clone ...`

Install dependencies

`npm install`

Run a development build...

`npm start`

...or a production build.

`npm run production`

Build without running:

`npm run build` (build output is in `./build` directory)

Development builds will copy `phaser.min.js` together with `phaser.map` and `phaser.js`
Your ES6 code will be transpiled into ES5 and concatenated into a single file.
A sourcemap for your code will also be included (by default `game.map.js`).

Production builds will only copy `phaser.min.js`. Your ES6 code will be transpiled and
minified using UglifyJS.

Any modification to the files inside the `./src` and `./static` folder will trigger a full page reload.

If you modify the contents of other files, please manually restart the server.