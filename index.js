var constants = require('./constants');

module.exports.create = require('./create');
module.exports.translator = require('./translator');

if(process.argv.length > 2){
  var filepath = process.argv[2],
    version = process.argv.length > 3 ? process.argv[3] : constants.DEFAULT_VERSION;
  module.exports.create(filepath, version);
}
