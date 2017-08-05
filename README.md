translations
============

NPM module that allows theme developers to use translations

## Create a localization template
The create function creates a translation sheet from the [resume-schema](https://github.com/jsonresume/resume-schema)
The create function takes two parameters.  The first is required and is the file path / name you want to create; if you do not include a file extension, the script will automatically add '.json' it.  The second parameter is [schema](https://github.com/jsonresume/resume-schema/releases) version, optional, which defaults to '0.0.0'.

To create a template for a French translation, localized to Canada, you could use:
```
node index path/to/file/fr_CA
```

Or procedurally:
```javascript
translations = require('translations');
translations.create('path/to/file/fr_CA');
```

That will create a file **fr_CA.json** that looks like:

```json
{
  "basics": "", \\fill in these strings with the translation
  "basics.name": "",
  "basics.label": "",
  "basics.picture": "",
  "basics.email": "",
  "basics.phone": "",
  ...
```
You can then complete the translation.

##Localization

Localization is done via [i18n](https://github.com/mashpie/i18n-node) package. The translator.factory() method returns a configured i18n object.  You can then use the object according to the i18n documentation.

```javascript
var t = require('translations').translator.factory();
console.log(t.__('basics.location.address')); //Street Address
```

The translator.factory() has two optional parameters.  The first 'lang' is the language you would like to use and corresponds to the localization file (like 'fr_CA' from above); this defaults to 'en'.  You can later change localization language as you go with:

```javascript
var t = require('translations').translator.factory('fr'); //start with French
t.setLocale('de'); //switch to German
```

The second parameter is the directory of the localization file, if you would like to use custom files not from the package.
```javascript
var t = require('translations').translator.factory('en_custom', 'local/file/path');
```
