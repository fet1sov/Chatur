<script setup lang="ts">
import MenuSection from 'src/frontend/types/MenuSection/MenuSection';
import { useI18n } from 'vue-i18n';

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
    <nav class="w-full min-w-[250px] max-w-[300px] h-[100vh] bg-lighttheme-primary-secondary">
        <ul>
            <li v-for="menuItem in menuSections">
                <RouterLink class="flex flex-row items-center" :to="menuItem.route">
                    <div class="w-[48px] h-[48px]">
                        <component :is="menuItem.icon"/>
                    </div>

                    <p>{{ menuItem.title }}</p>
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>