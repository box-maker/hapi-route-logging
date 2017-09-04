'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatRoutes = exports.getRouteList = undefined;

var _columnify = require('columnify');

var _columnify2 = _interopRequireDefault(_columnify);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _language = require('./language');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  const header = _language.i18n.t(heading);
  return _chalk2.default.blue.bold(header.toUpperCase());
}

function formatRoutes(server) {
  const listRoutes = getRouteList(server);
  listRoutes.forEach(route => {
    const columns = (0, _columnify2.default)(route.routes, {
      columns: ['method', 'path', 'description'],
      showHeaders: true,
      columnSplitter: ' | ',
      config: {
        method: {
          align: 'center',
          dataTransform: data => {
            return _chalk2.default.green(data);
          }
        },
        description: {
          dataTransform: data => {
            return _chalk2.default.yellow(data);
          }
        }
      },
      headingTransform: heading => {
        return formatHeader(heading);
      }
    });
    console.log(`${_language.i18n.t('URI')}: ${_chalk2.default.underline.cyan(route.uri)} - ${_language.i18n.t('Labels')}: ${_chalk2.default.gray(route.labels)}`);
    console.log(columns);
  }, this);
}

exports.getRouteList = getRouteList;
exports.formatRoutes = formatRoutes;
//# sourceMappingURL=route-list.js.map