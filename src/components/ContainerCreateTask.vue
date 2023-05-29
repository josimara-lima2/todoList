<template>
    <div class="flex gap-16">
        <OInput :value="newTask" />
        <ButtonCreateTask @click:criar="criar" />
    </div>
</template>

<script setup>
import OInput from './OInput.vue';
import ButtonCreateTask from './ButtonCreateTask.vue'
import { inject, ref } from 'vue';
const tasks = inject('tasks')
const newTask = ref({ id: '', text: '' })

const criar = () => {
    if (newTask.value.text === '') return
    const tasksList = JSON.parse(localStorage.getItem('tasks'))
    localStorage.setItem('tasks', JSON.stringify([...tasksList, { id: tasksList[tasksList.length - 1]?.id || 1, text: newTask.value.text }]));
    console.log('criou', tasks)
    tasks.value.push({ id: tasksList[tasksList.length - 1]?.id || 1, text: newTask.value.text })

}

</script>

<style lang="scss" scoped></style>