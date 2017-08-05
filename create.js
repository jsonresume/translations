var fs = require('fs')
  request = require('request'),
  constants = require('./constants');

module.exports = function(filename, version){
  version = version || constants.DEFAULT_VERSION;
  if(filename.indexOf('.js') === -1){filename += '.json';}
  var schema = 'https://raw.githubusercontent.com/jsonresume/resume-schema/'+version+'/schema.json';
  request.get(schema, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var schemaObject = JSON.parse(body);
        var readSchema =
          function(schema, depth){
            depth = depth || [];
            var obj = {};

            if(schema.type === 'object'){
              for(prop in schema.properties){
                depth.push(prop);
                obj[depth.join('.')] = "";
                Object.assign(obj, readSchema(schema.properties[prop], depth));
                depth.pop();
              }
            }else if(schema.type === 'array'){
              obj = readSchema(schema.items, depth);
            }

            var isEmpty = Object.keys(obj).length === 0 && obj.constructor === Object;
            return obj;
          };
        var localization = readSchema(schemaObject);
        fs.writeFile(filename, JSON.stringify(localization, null, 2));
    }else{
      console.log('error', error, response);
    }
  });
};
