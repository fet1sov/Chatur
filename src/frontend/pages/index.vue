<script setup lang="ts">
import { ServerInfo } from '../../shared/ServerInfo';
import { onMounted, ref, Ref } from 'vue';

const serverInfo : Ref<ServerInfo> = ref({
    port: 3000
} as ServerInfo);

declare global {
  interface Window {
    electronAPI: {
      getServerInfo: () => Promise<ServerInfo>;
    };
  }
}

const fetchServerInfo = async () => {
  try {
    const info = await window.electronAPI.getServerInfo();
    serverInfo.value = info;
  } catch(error) {
    console.error(`Failed to fetch the express server info: ${error}`);
  }
}

onMounted(async () => {
    await fetchServerInfo();
});
</script>

<template>
    <h1 class="text-[32pt] font-bold">{{ $t("menu.sections.general") }}</h1>

    <div>
        <p>{{ $t("general.aboutlink") }}</p>
        <p>http://localhost:{{ serverInfo.port }}</p>
    </div>
</template>