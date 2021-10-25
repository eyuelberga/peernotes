import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import am from './locales/am.json';
import en from './locales/en.json';
// the translations
// (tip move them in a JSON file and import them)
const resources = {
  am: {
    translation: am,
  },
  en: {
    translation: en,
  },
};
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
  });
export default i18n;
