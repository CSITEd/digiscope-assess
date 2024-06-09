<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch('/api/test')
</script>

<template>
  <div>
    <h1>Welcome</h1>
  </div>

  <MCQuestion v-if="data" :question="data.questions[0]" />
</template>
