<script setup lang="ts">
import { provide, Ref, ref } from 'vue';
import NavigationMenu from './components/NavigationMenu/NavigationMenu.vue';
import SplashNotification from './components/SplashNotification/SplashNotification.vue';
import ChatConfiguration from './types/Configuration/ChatConfiguration';
import { BUTTONS_OK_CANCEL } from './content/SplashNotification/ButtonsEnums';

let configuration: Ref<ChatConfiguration> = ref({
  fontSize: 14,
  connections: {
    youtubeTag: ""
  }
} as ChatConfiguration);
let tempConfiguration: Ref<ChatConfiguration> = ref(configuration);

const showSplash = ref(false);
provide("chatConfiguration", configuration);

function updateSettings(newConfig: ChatConfiguration): void
{
  tempConfiguration.value = newConfig;
  showSplash.value = true;
}

function splashAction(name: string): void {
  switch(name) {
    case 'ok': {
      showSplash.value = false;
      configuration.value = tempConfiguration.value;
    }
    case 'cancel': {
      showSplash.value = false;
      tempConfiguration.value = configuration.value;
    }
  }
}

declare global {
  interface Window {
    electronAPI: {
      setupChatConfiguration: () => Promise<ChatConfiguration>;
    };
  }
}


</script>

<template>
  <div class="w-full h-full flex flex-row">
    <NavigationMenu/>
    <SplashNotification
      v-if="showSplash"
      message="splash.savechanges"
      :buttons="BUTTONS_OK_CANCEL"
      @splashAction="splashAction"/>
    <div class="w-[30px]"></div>
    <div class="w-full">
      <RouterView 
        @updateSettings="updateSettings"/>
    </div>
  </div>
</template>