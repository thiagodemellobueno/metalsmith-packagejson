var fs = require('fs');

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
  var obj;
  fs.readFile('./package.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
  });

  return function(files, metalsmith, done){
    var metadata = metalsmith.metadata();
        metadata['pkg'] = obj;
    done();
  };
}
