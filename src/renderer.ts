import { createApp } from 'vue';
import App from './frontend/app.vue';
import { createI18n } from 'vue-i18n';
import { createRouter, createWebHistory } from 'vue-router';

import index from './frontend/pages/index.vue';

import enLocale from './locales/en.json';
import ruLocale from './locales/ru.json';

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: enLocale,
        ru: ruLocale
    }
});

const router = createRouter({
    routes: [
        { path: '/', component: index },
    ],
    history: createWebHistory()
});

const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount('#app');