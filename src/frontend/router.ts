import { createRouter, createWebHistory } from 'vue-router';

import index from './pages/index.vue';
import chat from './pages/sections/chat.vue';
import services from './pages/sections/services.vue';

export const router = createRouter({
    routes: [
        { path: '/', component: index },
        { path: '/chat', component: chat },
        { path: '/services', component: services },
    ],
    history: createWebHistory()
});