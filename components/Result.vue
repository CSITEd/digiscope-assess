<script setup lang="ts">
import VueSpeedometer from 'vue-speedometer'

defineProps<{
  knowledge: number
  behaviour: number
}>()

const options = {
  endColor: 'green',
  height: 180,
  maxSegmentLabels: 5,
  maxValue: 10,
  segments: 100,
  startColor: 'tomato',
}
</script>

<template>
  <VCard title="Résultats">
    <VCardText>
      <div class="gauges">
        <VCard flat>
          <VCardTitle class="d-flex justify-center">Connaissances</VCardTitle>
          <VCardText class="text-center">
            <VueSpeedometer v-bind="options" :value="knowledge" />
            <div>
              <p>Cette jauge mesure ton niveau de connaissance à propos des <strong>impacts</strong> du numérique sur l'environnement et le climat, sur la santé, le bien-être, la biodiversité, etc.</p>
            </div>
          </VCardText>
        </VCard>

        <VCard flat>
          <VCardTitle class="d-flex justify-center">Comportements</VCardTitle>
          <VCardText class="text-center">
            <VueSpeedometer v-bind="options" :value="behaviour" />
            <div>
              <p>Cette jauge évalue ton type de comportement par rapport à ton <strong>usage</strong> de technologies numériques, par rapport à leurs impacts sur l'environnement, etc.</p>
            </div>
          </VCardText>
        </VCard>
      </div>
    </VCardText>
  </VCard>
</template>

<style scoped>
.gauges {
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 400px) {
  .gauges {
    grid-template-columns: 1fr;
  }
}
</style>
