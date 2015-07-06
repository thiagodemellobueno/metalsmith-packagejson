var fs = require('fs');
var extend = require('extend');

/**
 * Expose `plugin`.
 */

module.exports = plugin;


/**
 * Metalsmith plugin to hide drafts from the output.
 *
 * @param {Object} opts
 * @return {Function}
 */

function plugin(opts){
  var obj = {};
  fs.readFile('./package.json', 'utf8', function (err, data) {
    obj = JSON.parse(data);
  });

  return function(files, metalsmith, done){
    var metadata = metalsmith.metadata();

    // Load in the local package.json if it's available.
    var localPackage = {};
    if (files['package.json']) {
      localPackage = JSON.parse(files['package.json'].contents.toString());
      // Do not deply it.
      delete files['package.json'];
    }

    // Merge the local package.json into the application's package.json.
    metadata['pkg'] = extend({}, obj, localPackage);
    done();
  };
}
