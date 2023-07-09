<template>
    <div class="mt-[55px]  gap-16 m-auto flex flex-wrap items-center justify-center">
        <OInput :value="newTask" />
        <ButtonCreateTask @click:criar="criar" />
    </div>
</template>

<script setup>
import OInput from './OInput.vue';
import ButtonCreateTask from './ButtonCreateTask.vue'
import { inject, ref } from 'vue';
const {tasks, addNewItemTasks} = inject('tasks')
const newTask = ref({ id: '', text: '', conluida: false })

const criar = () => {
   // debugger
    if (newTask.value.text === '') return
    const tasksList = JSON.parse(localStorage.getItem('tasks') ) || []
    //console.log(tasksList[tasksList.length - 1]?.id, 'ididididid')
    localStorage.setItem('tasks', JSON.stringify([...tasksList, { id: tasksList[tasksList.length - 1]?.id + 1 || 1, text: newTask.value.text, concluida:newTask.value.conluida }]));
    //console.log('criou', tasks)
    
    addNewItemTasks({id: tasksList[tasksList.length - 1]?.id + 1 || 1, text: newTask.value.text, concluida:newTask.value.conluida})
    newTask.value = { id: '', text: '', conluida:false }
}

</script>

<style lang="scss" scoped></style>