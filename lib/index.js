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
  try {
    var content = fs.readFileSync('./package.json', { encoding: 'utf8' });
    obj = JSON.parse(content);
  }
  catch (e) {
    // There was an error reading package.json, so do nothing about it.
  }

  return function(files, metalsmith, done){
    var metadata = metalsmith.metadata();

    // Load in the local package.json if it's available.
    var localPackage = {};
    if (files['package.json']) {
      localPackage = JSON.parse(files['package.json'].contents.toString());
      // It is now read in, so delete it.
      delete files['package.json'];
    }

    // Merge the local package.json into the application's package.json.
    metadata['pkg'] = extend({}, obj, localPackage);
    done();
  };
}
