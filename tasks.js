const fs = require('fs-extra');
const yargs = require('yargs');

const argv = yargs
  .command('translations')
  .demandCommand(1)
  .argv;

function translations() {
  console.log('Copy translations');
  fs.copySync('./src/locales', './lib/locales');
}

const task = argv._[0];

switch (task) {
  case 'translations':
    translations();
    break;

  default:
    break;
}
