<script setup lang="ts">
import type { IChoice } from '@/server/models/question'

const props = defineProps<{
  question: {
    choices: IChoice[]
    context?: string
    image?: string
    statement: string
  }
}>()

const selectedAnswer = defineModel<number>()
</script>

<template>
  <VSheet>
    <div>
      <p v-if="question.context">{{ question.context }}</p>

      <div v-if="question.image" class="text-center mb-5 mt-5">
        <img :src="`/${question.image}`" style="max-width: 100%" />
      </div>

      <p class="font-weight-bold">{{ question.statement }}</p>
    </div>

    <div class="mt-5">
      <VItemGroup selected-class="bg-primary" class="choices" v-model="selectedAnswer">
        <VItem v-for="choice in question.choices" v-slot="{ selectedClass, toggle }">
          <VCard :class="selectedClass" variant="tonal" @click="toggle">
            <VCardText v-if="choice.type === 'text'" class="d-flex justify-center align-center">
              {{ choice.text }}
            </VCardText>
            <VCardText v-else-if="choice.type === 'image'" class="d-flex justify-center align-center">
              <img :src="`/${choice.image}`" />
            </VCardText>
          </VCard>
        </VItem>
     </VItemGroup>
    </div>
  </VSheet>
</template>

<style scoped>
.choices {
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 400px) {
  .choices {
    grid-template-columns: 1fr;
  }
}
</style>
