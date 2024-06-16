<script setup lang="ts">
const { data } = await useFetch('/api/test')
</script>

<template>
  <Quiz :questions="data.questions" />
</template>
