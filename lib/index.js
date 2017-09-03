'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _latestVersion = require('latest-version');

var _latestVersion2 = _interopRequireDefault(_latestVersion);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _routeList = require('./route-list');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const optionsSchema = {
  showRoutes: _joi2.default.boolean().default(true),
  showRoutesList: _joi2.default.boolean().default(false),
  checkUpgrade: _joi2.default.boolean().default(false)
};

function register(server, options, next) {
  const checkOptions = _joi2.default.validate(options, optionsSchema);
  if (checkOptions.error) {
    throw checkOptions.error;
  }
  options = checkOptions.value;

  server.on('start', () => {
    if (options.showRoutesList) {
      (0, _routeList.formatRoutes)(server);
    }

    console.log('\n');
    const introMessage = `Server running at ${server.info.uri} with Hapi version`;
    const quitText = 'CTRL-C';
    const quitMessage = `Quit the server with ${_chalk2.default.bgYellow.black(quitText)}.`;
    const serverHapiVersion = server.version;
    if (options.checkUpgrade) {
      (0, _latestVersion2.default)('hapi').then(version => {
        if (_semver2.default.gt(version, serverHapiVersion)) {
          console.log(`${introMessage} ${_chalk2.default.bgRed(serverHapiVersion)}`);
          console.log(_chalk2.default.red(`\t Upgrade Hapi.js, latest version is ${version}`));
        } else {
          console.log(`${introMessage} ${serverHapiVersion}`);
        }
        console.log(quitMessage);
      });
    } else {
      console.log(`${introMessage} ${serverHapiVersion}`);
      console.log(quitMessage);
    }
  });

  if (options.showRoutes) {
    server.on('response', request => {
      // TODO: Support multiple connections (https://hapijs.com/api#serverconnections)
      const date = new Date(request.info.received);
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
          typeText = _chalk2.default.blue(server.info.protocol.toUpperCase());
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
  }

  return next();
}

register.attributes = {
  pkg: _package2.default
};

module.exports = register;
//# sourceMappingURL=index.js.map