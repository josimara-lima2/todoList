<template>
    <div class="flex flex-col gap-12">

        <ItemTask v-for="task in tasks" :key="task.id">
            <template #texto>
                {{ task.text }}
            </template>
        </ItemTask>

    </div>
</template>

<script setup>
import { inject, onMounted, provide, ref, watch } from 'vue';
import ItemTask from './ItemTask.vue';

const tasks = inject(('tasks'))

onMounted(() => {
    console.log(tasks)
})
</script>

<style lang="scss" scoped></style>