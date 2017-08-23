'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function register(server, options, next) {
  server.on('start', () => {
    console.log(`Server running at ${server.info.uri} with Hapi version ${server.version}`);
    console.log(`Quit the server with ${_chalk2.default.italic.black.bgYellow('CONTROL-C')}.`);
  });
  server.on('response', request => {
    const date = new Date(request.server.info.created);
    const dateText = `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`;

    const infoText = _chalk2.default.green(`"${request.method.toUpperCase()} ${request.url.path}"`);

    let statusCode;
    let typeText;
    let errorText = null;
    try {
      statusCode = request.response.statusCode;
      if (parseInt(statusCode, 10) >= 400) {
        statusCode = _chalk2.default.black.bgRed(statusCode);
        typeText = _chalk2.default.red('ERROR');
        errorText = request.response.source.message;
      } else {
        typeText = _chalk2.default.blue('HTTP');
      }
    } catch (err) {
      statusCode = '';
    }

    const totalTime = new Date(request.info.responded) - new Date(request.info.received);
    const totalTimeText = _chalk2.default.red(`${totalTime}ms`);

    const output = `${dateText} [${typeText}] ${infoText} ${statusCode} ${totalTimeText}`;
    console.log(output);
    if (errorText) {
      console.error(`\t${_chalk2.default.bold('Error')}: ${_chalk2.default.italic.underline(errorText)}`);
    }
  });
  return next();
}

register.attributes = {
  name: 'hapi-route-logging',
  version: '0.1.0'
};

module.exports = register;
//# sourceMappingURL=index.js.map