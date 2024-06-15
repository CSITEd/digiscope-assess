<script setup lang="ts">
const props = defineProps<{
  questions: any[]
}>()
const length = computed(() => props.questions.length)

const currentQuestion = ref(0)

function nextQuestion() {
  if (currentQuestion < length) {
    currentQuestion.value++;
  }
}
</script>

<template>
  <p>Current question: {{ currentQuestion }}.</p>

  <Question :question="questions[currentQuestion]" />
  <VBtn @click="nextQuestion">Valider</VBtn>
</template>
