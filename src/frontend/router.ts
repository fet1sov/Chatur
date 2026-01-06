import { createRouter, createWebHistory } from 'vue-router';

import index from './pages/index.vue';
import chat from './pages/sections/chat.vue';

export const router = createRouter({
    routes: [
        { path: '/', component: index },
        { path: '/chat', component: chat },
    ],
    history: createWebHistory()
});