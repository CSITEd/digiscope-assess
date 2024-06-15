<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch('/api/test')
</script>

<template>
  <div>
    <h1>Welcome</h1>
  </div>

  <Quiz :questions="data.questions" />
</template>
