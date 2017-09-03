import columnify from 'columnify';
import chalk from 'chalk';

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
        return chalk.blue.bold(heading.toUpperCase());
      }
    });
    console.log(`URI: ${chalk.underline.cyan(route.uri)} - Labels: ${chalk.gray(route.labels)}`);
    console.log(columns);
  }, this);
}

export {getRouteList, formatRoutes};
