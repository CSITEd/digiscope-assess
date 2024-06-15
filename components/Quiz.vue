<script setup lang="ts">
const props = defineProps<{
  questions: any[]
}>()
const length = computed(() => props.questions.length)

const currentQuestion = ref(0)
const selectedAnswer = ref<number>()
const canMoveNext = computed(() => selectedAnswer.value !== undefined)

function nextQuestion() {
  if (currentQuestion.value < length.value - 1) {
    currentQuestion.value++;
    selectedAnswer.value = undefined
  }
}
</script>

<template>
  <p>Current question: {{ currentQuestion + 1 }} on {{ length }}</p>
  <p>Selected answer: {{ selectedAnswer }}</p>

  <Question :question="questions[currentQuestion]" v-model="selectedAnswer" />
  <VBtn color="success" :disabled="!canMoveNext" @click="nextQuestion">Valider</VBtn>
</template>
