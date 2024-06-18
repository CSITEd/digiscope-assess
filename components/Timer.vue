<script setup lang="ts">
import { Duration } from 'luxon'

const props = defineProps<{
  duration: number
  startTimestamp: number
}>()

const emit = defineEmits<{
  elapsed: []
}>()

const { timestamp: currentTimestamp, pause } = useTimestamp({ controls: true, offset: 0 })
const endTimestamp = computed(() => (props.startTimestamp + props.duration * 1000))
const remaining = computed(() => endTimestamp.value - currentTimestamp.value)
const remainingTime = computed(() => Duration.fromMillis(remaining.value).toFormat('mm:ss'))

watch(() => Math.floor(remaining.value / 1000) <= 0, (isElapsed) => {
  if (isElapsed) {
    pause()
    emit('elapsed')
  }
})
</script>

<template>
  <VChip color="primary" prepend-icon="mdi-clock" :text="remainingTime" />
</template>
