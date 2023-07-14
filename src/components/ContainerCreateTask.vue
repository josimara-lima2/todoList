<template>
    <div class="-mt-[30px] sm:mt-[30px] gap-16 m-auto flex flex-wrap items-center justify-center">
        <OInput :value="newTask" />
        <ButtonCreateTask @click:criar="criar()" :disabled="!disabled"/>
    </div>
</template>

<script setup>
import OInput from './OInput.vue';
import ButtonCreateTask from './ButtonCreateTask.vue'

import { inject, onMounted, ref, watch } from 'vue';
const { addNewItemTasks} = inject('tasks')

const newTask = ref({ id: '', text: '', conluida: false })
const disabled = ref(false)
watch(() => [newTask.value], () => {
    if (newTask.value.text === ''){
        disabled.value = false
    }else{
        disabled.value = true
    }
}, {deep:true})

 const criar = () => {

    if (newTask.value.text === '') return
    const tasksList = JSON.parse(localStorage.getItem('tasks') ) || []
    localStorage.setItem('tasks', JSON.stringify([...tasksList, { id: tasksList[tasksList.length - 1]?.id + 1 || 1, text: newTask.value.text, concluida:newTask.value.conluida }]));
    addNewItemTasks({id: tasksList[tasksList.length - 1]?.id + 1 || 1, text: newTask.value.text, concluida:newTask.value.conluida})
    newTask.value = { id: '', text: '', conluida:false }
}
 
const handleClickEnter = () => {
    const input = document.querySelector('.input')
    if(input){
        input.addEventListener('keypress', (event) => {
            if (event.key === "Enter"){

               criar()
            }
        })
    }
}

onMounted(() => [
  handleClickEnter()
])

</script>

<style lang="scss" scoped></style>