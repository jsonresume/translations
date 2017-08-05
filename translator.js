var fs = require('fs'),
    i18n = require("i18n"),
    constants = require('./constants');

module.exports.factory = function(lang, directory){
  var localizationsPath = __dirname + '/localizations/'+constants.DEFAULT_VERSION;
  i18n.configure({
    directory: directory || localizationsPath,
    defaultLocale: directory ? lang : 'en',
    register:global
  });
  if(lang){
    i18n.setLocale('de');
  }
  return i18n;
};
