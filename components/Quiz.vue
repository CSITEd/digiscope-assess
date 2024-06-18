<script setup lang="ts">
const props = defineProps<{
  quiz: {
    key: string
    questions: any[]
  }
}>()
const emit = defineEmits<{
  finished: [answers: (number | null)[]]
}>()

const length = computed(() => props.quiz.questions.length)

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
  selectedAnswer.value = undefined
  currentQuestion.value++;

  if (!ongoing.value) {
    emit('finished', answers.value)
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
      <Timer :duration="10" :start-timestamp="Date.now()" @elapsed="console.log('ELAPSED')" />
    </template>

    <template v-slot:text>
      <Question v-if="ongoing" :question="quiz.questions[currentQuestion]" v-model="selectedAnswer" />
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
  <p>Key: {{ quiz.key }}</p>
</template>
