<script setup lang="ts">
import { ref, Ref } from 'vue';

const port : Ref<string> = ref("3000");
</script>

<template>
    <h1 class="text-[32pt] font-bold">{{ $t("menu.sections.general") }}</h1>

    <div>
        <p>{{ $t("general.aboutlink") }}</p>
        <p>http://localhost:{{ port }}</p>
    </div>
</template>