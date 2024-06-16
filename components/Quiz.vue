<script setup lang="ts">
const props = defineProps<{
  questions: any[]
}>()
const length = computed(() => props.questions.length)

const currentQuestion = ref(0)
const selectedAnswer = ref<number>()
const answers = ref<(number | null)[]>([])
const canMoveNext = computed(() => selectedAnswer.value !== undefined)
const ongoing = computed(() => currentQuestion.value < length.value)

function saveAnswer() {
  const answer = selectedAnswer.value
  if (ongoing && answer !== undefined) {
    answers.value.push(answer)
    nextQuestion()
  }
}

function skipQuestion() {
  if (ongoing.value) {
    answers.value.push(null)
    nextQuestion()
  }
}

function nextQuestion() {
  if (ongoing.value) {
    selectedAnswer.value = undefined
    currentQuestion.value++;
  }
}
</script>

<template>
  <VCard>
    <template v-slot:title>
      <template v-if="ongoing">
        Question {{ currentQuestion + 1 }} sur {{ length }}
      </template>
      <template v-else>Résultats</template>
    </template>

    <template v-if="ongoing" v-slot:append>
      <Timer :start-timestamp="Date.now()" />
    </template>

    <template v-slot:text>
      <Question v-if="ongoing" :question="questions[currentQuestion]" v-model="selectedAnswer" />
    </template>

    <template v-slot:actions v-if="ongoing">
      <div class="d-flex flex-wrap justify-center w-100">
        <VBtn color="warning" text="Passer la question" @click="skipQuestion" />
        <VBtn color="primary" :disabled="!canMoveNext" text="Enregistrer la réponse" @click="saveAnswer" />
      </div>
    </template>
  </VCard>

  <p v-if="ongoing">Selected answer: {{ selectedAnswer }}</p>
  <p>Answer: {{ answers }}</p>
  <p>Status: {{ ongoing ? 'ONGOING' : 'FINISHED' }}</p>
</template>
