<script setup lang="ts">
import type { IChoice } from '@/server/models/question'

const props = defineProps<{
    question: {
        choices: IChoice[]
        statement: string
    }
}>()
</script>

<template>
    <VCard>
        <VCardText>
            {{ question.statement }}

            <VItemGroup selected-class="bg-primary" class="choices">
                <VItem v-for="choice in question.choices" v-slot="{ selectedClass, toggle }">
                    <VCard :class="selectedClass" @click="toggle">
                        <VCardText v-if="choice.type === 'text'" class="d-flex justify-center align-center">
                            {{ choice.text }}
                        </VCardText>
                        <VCardText v-else-if="choice.type === 'image'" class="d-flex justify-center align-center">
                            <img :src="`/${choice.image}`" />
                        </VCardText>
                    </VCard>
                </VItem>
            </VItemGroup>
        </VCardText>
    </VCard>
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