<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { RecaptchaAction, useGoogleRecaptcha } from '../composables/useGoogleRecaptcha'

const loading = ref()
const phase = ref<'quiz' | 'result'>()
const data = ref()

const { executeRecaptcha } = useGoogleRecaptcha()
const human = ref()

const loadQuiz = async () => {
  const { token } = await executeRecaptcha(RecaptchaAction.login)

  try {
    human.value = false

    data.value = await $fetch('/api/quiz', {
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
}

const saveResults = async (answers) => {
  const { token } = await executeRecaptcha(RecaptchaAction.login)

  try {
    human.value = false

    await $fetch('/api/quiz', {
      baseURL: 'http://localhost:3000',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'google-recaptcha-token': token ?? '',
      },
      body: {
        answers,
        key: data.value.key,
      },
    })

    human.value = true
  } catch (e) {

  } finally {
    loading.value = false
  }
}

const finished = async (args) => {
  loading.value = true
  phase.value = 'result'

  await saveResults(args)
}

onMounted(async () => {
  loading.value = true
  phase.value = 'quiz'

  await loadQuiz()
})
</script>

<template>
  <template v-if="phase === 'quiz' && loading">
    <VSkeletonLoader type="card" />
    <div class="d-flex justify-center">
      ⏳ Chargement du quiz en cours, patience...
    </div>
  </template>

  <template v-if="!human && !loading">
    <p>You are not a human!</p>
  </template>

  <template v-else>
    <Quiz v-if="phase === 'quiz' && !loading" :quiz="data" @finished="finished" />

    <Result v-if="phase === 'result' && !loading" :knowledge="6" :behaviour="4" />
  </template>
</template>
