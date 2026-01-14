<script setup lang="ts">
import { inject, ref, Ref } from 'vue';
import Configuration from '../../types/Configuration/ChatConfiguration';
const emit = defineEmits(['updateSettings']);

const configurationValues: Ref<Configuration> = ref(inject("chatConfiguration"));

function inputYouTubeTag(event: InputEvent)
{
    configurationValues.value.connections.youtubeTag = (event.target as HTMLInputElement).value;
    emit("updateSettings", configurationValues.value);
}
</script>

<template>
    <h1 class="text-[32pt] font-bold">{{ $t("menu.sections.services") }}</h1>

    <div>
        <p class="mb-[10px]"><strong class="text-[red]">YouTube</strong> {{ $t("menu.services.integration") }}</p>
        <input 
            type="text"
            :value="configurationValues.connections.youtubeTag"
            :placeholder="$t('menu.services.youtube.placeholder')"
            @input="inputYouTubeTag"
            class="w-full p-[10px] rounded-[10px] bg-lighttheme-primary-secondary border border-lighttheme-secondary-light"/>
    </div>
</template>