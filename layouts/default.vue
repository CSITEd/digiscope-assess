<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const onHomePage = computed(() => route.fullPath === '/')
</script>

<template>
  <VAppBar density="compact" title="DigiScope">
    <template v-if="!onHomePage" v-slot:append>
      <VBtn density="compact" prepend-icon="mdi-home" text="Home" to="/" />
    </template>
  </VAppBar>

  <VMain>
    <slot />
  </VMain>

  <VFooter>

  </VFooter>
</template>
