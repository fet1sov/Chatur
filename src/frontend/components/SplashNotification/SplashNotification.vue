<script lang="ts" setup>
import { SplashButton } from 'src/frontend/types/SplashNotification/SplashButton';
import { onMounted, ref } from 'vue';

const props = defineProps<{
    message: string,
    buttons?: Array<SplashButton>
}>();

const showMe = ref(true);
const timer = ref(3);

const startCountdown = () => {
    const tick = () => {
        if (timer.value > 0)
        {
            timer.value--;
            setTimeout(tick, 1000);   
        } else {
            showMe.value = false;
        }
    };
    setTimeout(tick, 1000);
}

onMounted(() => {
    if (!props.buttons.length)
    {
        startCountdown();
    }
});
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>

<template>
    <div
        v-if="showMe" 
        class="fixed w-[60%] h-[50px] flex flex-row justify-between items-center left-[50%] shadow-xl/30 transform-[translateX(-50%)] px-[15px] bottom-[15px] rounded-[30px] bg-lighttheme-primary-secondary border-1 border-lighttheme-secondary-light border-solid">
        <p :class="(buttons ? '' : 'text-center w-full')">{{ $t(message) }}</p>
        <div v-if="buttons" class="flex flex-row">
            <button 
            v-for="button in buttons"
            :class="'p-[10px] rounded-[20px] ' + button.class"
            @click="$emit('splashAction', button.name)">
                {{ $t(button.placeholder) }}
            </button>
        </div>
    </div>
</template>