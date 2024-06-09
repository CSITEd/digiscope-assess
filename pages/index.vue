<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch('/api/test')
</script>

<template>
  <div>
    <h1>Welcome</h1>
    <pre>{{ data }}</pre>
  </div>
</template>
