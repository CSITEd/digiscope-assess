<script setup lang="ts">
const props = defineProps<{
    question: { choices: string[], statement: string }
}>()
</script>

<template>
    <VCard>
        <VCardText>
            {{ question.statement }}

            <VItemGroup selected-class="bg-primary" class="choices">
                <VItem v-for="choice in question.choices" v-slot="{ selectedClass, toggle }">
                    <VCard :class="selectedClass" @click="toggle">
                        <VCardText class="d-flex justify-center align-center">{{ choice.text }}</VCardText>
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