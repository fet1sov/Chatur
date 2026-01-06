<script setup>
import NavigationMenu from './components/NavigationMenu/NavigationMenu.vue';
</script>

<template>
  <div class="w-full h-full flex flex-row">
    <NavigationMenu/>
    <div class="w-[30px]"></div>
    <div class="w-full">
      <RouterView />
    </div>
  </div>
</template>