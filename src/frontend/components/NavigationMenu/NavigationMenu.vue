<script setup lang="ts">
import MenuSection from 'src/frontend/types/MenuSection/MenuSection';
import { useI18n } from 'vue-i18n';
import InlineSvg from 'vue-inline-svg';

const { t } = useI18n();

const menuSections : Array<MenuSection> = [
    {
        "title": t("menu.sections.general"),
        "route": "/"
    },
    {
        "title": t("menu.sections.chat"),
        "route": "/chat"
    },
    {
        "title": t("menu.sections.services"),
        "route": "/services"
    }
];
</script>

<template>
    <nav 
    class="w-full min-w-[220px] max-w-[250px] h-[100vh] border-r border-lighttheme-secondary-light bg-lighttheme-primary-secondary">
        <ul>
            <li :class="'transition-all duration-700 hover:bg-lighttheme-secondary-primary hover:text-lighttheme-primary-secondary ' + (this.$route.path == menuItem.route ? 'bg-lighttheme-secondary-primary text-lighttheme-primary-secondary' : '')" v-for="menuItem in menuSections">
                <RouterLink class="flex flex-row items-center" :to="menuItem.route">
                    <div class="w-[48px] h-[48px]">
                        <inline-svg :src="menuItem.icon" width="48" height="48" fill="black"/>
                    </div>

                    <p>{{ menuItem.title }}</p>
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>