import columnify from 'columnify';
import chalk from 'chalk';

import {i18n} from './language';

// TODO: Access info via web interface

function getRouteList(server) {
  const list = [];
  const tables = server.table();
  tables.forEach(table => {
    const routesTable = [];
    table.table.forEach(element => {
      // TODO: Show element.config.auth
      let routeDescription;
      try {
        routeDescription = element.settings.description;
      } catch (err) {
        routeDescription = '';
      }
      routesTable.push({
        method: element.method.toUpperCase(),
        path: element.path,
        description: routeDescription
      });
    }, this);
    list.push({
      id: table.info.id,
      uri: table.info.uri,
      labels: table.labels,
      routes: routesTable
    });
  }, this);

  return list;
}

function formatHeader(heading) {
  const header = i18n.t(heading);
  return chalk.blue.bold(header.toUpperCase());
}

function formatRoutes(server) {
  const listRoutes = getRouteList(server);
  listRoutes.forEach(route => {
    const columns = columnify(route.routes, {
      columns: ['method', 'path', 'description'],
      showHeaders: true,
      columnSplitter: ' | ',
      config: {
        method: {
          align: 'center',
          dataTransform: data => {
            return chalk.green(data);
          }
        },
        description: {
          dataTransform: data => {
            return chalk.yellow(data);
          }
        }
      },
      headingTransform: heading => {
        return formatHeader(heading);
      }
    });
    console.log(
      `${i18n.t('URI')}: ${chalk.underline.cyan(route.uri)} - ${i18n.t('Labels')}: ${chalk.gray(route.labels)}`
    );
    console.log(columns);
  }, this);
}

export {getRouteList, formatRoutes};
