<script setup lang="ts">
import type { ErrorOpts } from '~/types/index';

const { clearMuseError } = useMuseError();

defineProps({
  error: {
    type: Object as PropType<ErrorOpts>,
    required: true
  }
});

</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center p-20">
    <div class="flex flex-col items-center">
      <h1 class="text-4xl text-muse-blue font-bold mb-2">{{ error.statusCode }}</h1>
      <h2 class="text-muse-dark mb-2">{{ error.statusMessage  }}</h2>
      <button
        class="text-muse-blue" 
        @click="clearMuseError({ redirect: '/' })" 
      >Go back home</button>
    </div>
    <img src="~/assets/svg/404.svg" class="w-1/2" />
  </div>
</template> 
