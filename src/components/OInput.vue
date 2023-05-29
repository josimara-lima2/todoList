<template>
    <div>
        <input class="input h-52" type="text" placeholder="Adicione uma nova tarefa" v-model="value.text">
    </div>
</template>

<script setup>
const props = defineProps({
    value: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped></style>