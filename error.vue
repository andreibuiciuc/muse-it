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
  <div>
    <h1>{{ error.statusCode }}</h1>
    <h2>{{ error.statusMessage  }}</h2>
    <h2>{{ error.message }}</h2>
    <button @click="clearMuseError({ redirect: '/' })">Go back home</button>
  </div>
</template>
