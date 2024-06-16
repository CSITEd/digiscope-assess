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
    <VCardTitle>
      <template v-if="ongoing">
        Question {{ currentQuestion + 1 }} sur {{ length }}
      </template>
      <template v-else>Récapitulatif</template>
    </VCardTitle>

    <VCardText>
      <Question v-if="ongoing" :question="questions[currentQuestion]" v-model="selectedAnswer" />
    </VCardText>

    <VCardActions v-if="ongoing" class="d-flex justify-center">
      <VBtn color="warning" @click="skipQuestion">
        Passer la question
      </VBtn>
      <VBtn color="primary" :disabled="!canMoveNext" @click="saveAnswer">
        Enregistrer la réponse
      </VBtn>
    </VCardActions>
  </VCard>
  <p v-if="ongoing">Selected answer: {{ selectedAnswer }}</p>
  <p>Answer: {{ answers }}</p>
  <p>Status: {{ ongoing ? 'ONGOING' : 'FINISHED' }}</p>
</template>
