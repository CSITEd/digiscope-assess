<script setup lang="ts">
import { Duration } from 'luxon'

const props = defineProps<{
  startTimestamp: number
}>()

const currentTimestamp = useTimestamp({ offset: 0 })
const endTimestamp = computed(() => (props.startTimestamp + 12 * 60 * 1000))
const remaining = computed(() => Duration.fromMillis(endTimestamp.value - currentTimestamp.value).toFormat('mm:ss'))
</script>

<template>
  <VChip color="primary" prepend-icon="mdi-clock" :text="remaining" />
</template>
