import {join} from 'path';

import {sync as osLocale} from 'os-locale';
import {default as i18next} from 'i18next';
import {default as Backend} from 'i18next-sync-fs-backend';

const locale = osLocale();

const backendOptions = {
  loadPath: join(__dirname, 'locales/{{lng}}/{{ns}}.json'),
  addPath: join(__dirname, 'locales/{{lng}}/{{ns}}.json'),
  jsonIndent: 2
};

const i18n = i18next.use(Backend)
  .init({
    initImmediate: false,
    lng: locale,
    fallbackLng: 'en',
    backend: backendOptions
  });

export {i18n};
