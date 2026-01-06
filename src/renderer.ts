import { createApp } from 'vue';
import App from './frontend/app.vue';
import { i18n } from './frontend/i18n';
import { router } from './frontend/router';

const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount('#app');