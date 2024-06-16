<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RecaptchaAction, useGoogleRecaptcha } from '../composables/useGoogleRecaptcha'

const data = ref()
const loading = ref(true)
const human = ref(false)
const { executeRecaptcha } = useGoogleRecaptcha()

onMounted(async () => {
  const { token } = await executeRecaptcha(RecaptchaAction.login)
  try {
    data.value = await $fetch('/api/test', {
      baseURL: 'http://localhost:3000',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'google-recaptcha-token': token ?? '',
      },
    })
    human.value = true
  } catch (e) {

  } finally {
    loading.value = false
  }
})
</script>

<template>
  <VSkeletonLoader v-if="loading" type="card" />
  <template v-else>
    <template v-if="!human">
      <p>You are not a human!</p>
    </template>
    <Quiz v-else :questions="data?.questions" />
  </template>
</template>
