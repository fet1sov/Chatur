<script setup lang="ts">
import { GlobalConfiguration } from '../../configuration';
import { ref, Ref } from 'vue';

const port : Ref<string> = ref(String(GlobalConfiguration.httpServerPort));
</script>

<template>
    <h1 class="text-[32pt] font-bold">{{ $t("menu.sections.general") }}</h1>

    <div>
        <p>{{ $t("general.aboutlink") }}</p>
        <p>http://localhost:{{ port }}</p>
    </div>
</template>