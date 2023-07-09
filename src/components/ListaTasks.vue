<template>
    <div class="flex flex-col gap-12 overflow-y-auto overflow-x-hidden max-h-[300px]">

        <ItemTask v-for="task in tasks" :key="task.id" :task="task" @click:excluir="removeTask(task)" @click:concluir="concluir({...task, concluida:!task.concluida})">
            <template #texto>
                {{ task.text }}
            </template>
        </ItemTask>

    </div>
</template>

<script setup>
import { inject, onMounted, provide, ref, watch } from 'vue';
import ItemTask from './ItemTask.vue';

const {tasks, concluir, removeTask} = inject(('tasks'))

onMounted(() => {
    console.log(tasks)
})
</script>

<style lang="scss" scoped></style>