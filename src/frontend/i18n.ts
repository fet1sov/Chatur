import { createI18n } from 'vue-i18n';
import enLocale from './locales/en.json';
import ruLocale from './locales/ru.json';

export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: enLocale,
        ru: ruLocale
    }
});