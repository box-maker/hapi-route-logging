'use strict';

import chalk from 'chalk';

import packageJson from '../package.json';

function register(server, options, next) {
  server.on('start', () => {
    console.log(`Server running at ${server.info.uri} with Hapi version ${server.version}`);
    console.log(`Quit the server with ${chalk.italic.black.bgYellow('CONTROL-C')}.`);
  });
  server.on('response', request => {
    const date = new Date(request.server.info.created);
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
        typeText = chalk.blue('HTTP');
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
  return next();
}

register.attributes = {
  pkg: packageJson
};

module.exports = register;
