'use strict';

import chalk from 'chalk';
import Joi from 'joi';
import latestVersion from 'latest-version';
import semver from 'semver';

import packageJson from '../package.json';
import {formatRoutes} from './route-list';

const optionsSchema = {
  showRoutes: Joi.boolean().default(true),
  showRoutesList: Joi.boolean().default(false),
  checkUpgrade: Joi.boolean().default(false)
};

function register(server, options, next) {
  const checkOptions = Joi.validate(options, optionsSchema);
  if (checkOptions.error) {
    throw checkOptions.error;
  }
  options = checkOptions.value;

  server.on('start', () => {
    if (options.showRoutesList) {
      formatRoutes(server);
    }

    console.log('\n');
    const introMessage = `Server running at ${server.info.uri} with Hapi version`;
    const quitText = 'CTRL-C';
    const quitMessage = `Quit the server with ${chalk.bgYellow.black(quitText)}.`;
    const serverHapiVersion = server.version;
    if (options.checkUpgrade) {
      latestVersion('hapi').then(version => {
        if (semver.gt(version, serverHapiVersion)) {
          console.log(`${introMessage} ${chalk.bgRed(serverHapiVersion)}`);
          console.log(chalk.red(`\t Upgrade Hapi.js, latest version is ${version}`));
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

      const infoText = chalk.green(`"${request.method.toUpperCase()} ${request.url.path}"`);

      let statusCode;
      let typeText;
      let errorText = null;
      try {
        statusCode = request.response.statusCode;
        if (parseInt(statusCode, 10) >= 400) {
          statusCode = chalk.black.bgRed(statusCode);
          typeText = chalk.red('ERROR');
          errorText = request.response.source.message;
        } else {
          typeText = chalk.blue(server.info.protocol.toUpperCase());
        }
      } catch (err) {
        statusCode = '';
      }

      const totalTime = new Date(request.info.responded) - new Date(request.info.received);
      const totalTimeText = chalk.red(`${totalTime}ms`);

      const output = `${dateText} [${typeText}] ${infoText} ${statusCode} ${totalTimeText}`;
      console.log(output);
      if (errorText) {
        console.error(`\t${chalk.bold('Error')}: ${chalk.italic.underline(errorText)}`);
      }
    });
  }

  return next();
}

register.attributes = {
  pkg: packageJson
};

module.exports = register;
