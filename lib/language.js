'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i18n = undefined;

var _path = require('path');

var _osLocale = require('os-locale');

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _i18nextSyncFsBackend = require('i18next-sync-fs-backend');

var _i18nextSyncFsBackend2 = _interopRequireDefault(_i18nextSyncFsBackend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const locale = (0, _osLocale.sync)();

const backendOptions = {
  loadPath: (0, _path.join)(__dirname, 'locales/{{lng}}/{{ns}}.json'),
  addPath: (0, _path.join)(__dirname, 'locales/{{lng}}/{{ns}}.json'),
  jsonIndent: 2
};

const i18n = _i18next2.default.use(_i18nextSyncFsBackend2.default).init({
  initImmediate: false,
  lng: locale,
  fallbackLng: 'en',
  backend: backendOptions
});

exports.i18n = i18n;
//# sourceMappingURL=language.js.map