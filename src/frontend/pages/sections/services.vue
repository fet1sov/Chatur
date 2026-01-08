<script setup lang="ts">
    
</script>

<template>
    <h1 class="text-[32pt] font-bold">{{ $t("menu.sections.services") }}</h1>

    <div>
        <p class="mb-[10px]"><strong class="text-[red]">YouTube</strong> {{ $t("menu.services.integration") }}</p>
        <input 
            type="text" 
            :placeholder="$t('menu.services.youtube.placeholder')" 
            class="w-full p-[10px] rounded-[10px] bg-lighttheme-primary-secondary border border-lighttheme-secondary-light"/>
    </div>
</template>