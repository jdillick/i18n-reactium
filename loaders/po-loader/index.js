var po2json = require('po2json');
var utils = require('loader-utils');

module.exports = function(source) {
    var options = utils.getOptions(this);
    if (options === null) {
        options = {
            format: 'jed',
        };
    }

    // default option
    if (!('stringify' in options)) {
        options.stringify = true;
    }

    if (/^export/.test(source)) return source;

    return `export const strings = ${JSON.stringify(po2json.parse(source, options))}`;
}
