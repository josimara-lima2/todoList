<script setup>
import { RouterLink, RouterView } from "vue-router";
import ItemTask from './components/ItemTask.vue'
import OInput from './components/OInput.vue'
import ContainerCreateTask from "./components/ContainerCreateTask.vue";
import ListaTasks from "./components/ListaTasks.vue";
import ListaVazia from "./components/ListaVazia.vue";
import { inject, onMounted, ref, watch, provide } from "vue";
import OHeader from "./components/OHeader.vue";
const tasks = ref([])
const tasks_criadas = ref(0)
const tasks_concluidas = ref(0)
const getTasksLocalStorage = () => {
  const tasksList = localStorage.getItem('tasks') || [];
  console.log(tasksList)

  if(tasksList.length === 0){
    tasks.value  = []
    return
  }
  tasks.value = JSON.parse(tasksList)
  console.log(tasks.value)
}

const calcularConcluidas = () => {
  tasks_concluidas.value = tasks.value.filter(item => item.concluida === true).length;
}

watch(()=>[tasks.value], () => {
console.log('mudou')
  tasks_criadas.value = tasks.value.length
  calcularConcluidas()
}, {deep:true})

const addNewItemTasks = (obj) =>{
  console.log('chamou')
  tasks.value.push(obj)
}

const concluir = (task) => {
  console.log(tasks.value, task)
  const index = tasks.value.findIndex(item => item.id === task.id)
  console.log(tasks.value)
  if(index >= 0){
    tasks.value.splice( index, 1 , task ) ;
  }
 console.log(tasks.value)
  localStorage.setItem('tasks', JSON.stringify([...tasks.value]));
}

const removeTask = (task) => {
 tasks.value = tasks.value.filter(item => item.id !== task.id)
 localStorage.setItem('tasks', JSON.stringify([...tasks.value]));
}
provide('tasks', {tasks, addNewItemTasks, concluir, removeTask})

onMounted(() => {
   getTasksLocalStorage()
   console.log(tasks.value)
  tasks_criadas.value = tasks.value.length
})
</script>

<template>
<div class="max-h-screen overflow-hidden w-full flex flex-col items-center justify-center">
  <OHeader/>
  <div class=" max-w-[56rem] w-max md:w-[95vw] pb-40">
    <div class="mt-72 mb-32 items-center flex w-full justify-center">
    <img src="../public/Logo.png" />
  </div>
  <ContainerCreateTask />
  <div class="w-full pb-24 pt-52  flex gap-24 justify-between flex-wrap items-center">
    <div class="flex gap-8">
      <span  class="text-secondary font-bold text-sm ">Tarefas Criadas</span>
      <span class="bg-gray-400 rounded-full flex py-2 px-8 flex-col justify-center items-center gap-10"> <span class="counter-text">{{ tasks_criadas }}</span></span>
    </div>
    <div class="flex gap-8">
      <span class="text-primary font-bold text-sm">Concluídas</span>
  
      <span class="bg-gray-400 rounded-full flex py-2 px-8 flex-col justify-center items-center gap-10"> <span class="counter-text">{{ tasks_concluidas }} de {{ tasks_criadas }}</span></span>
    </div>
  </div>
   <ListaTasks v-show="tasks_criadas > 0"/> 
    <ListaVazia  v-show="tasks_criadas === 0" />
  </div>
</div>
</template>

<style scoped>
/* Scrollbar styles */

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #d9d9d9 #646464;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-track {
  background: #d9d9d9;
}

*::-webkit-scrollbar-thumb {
  background-color:#646464;
/*   background: repeating-linear-gradient(
    45deg,
   #646464,
   #646464 5px,
    #d9d9d9 5px,
    #d9d9d9 10px
  ); */
  border-radius: 20px;
  border: 3px solid #d9d9d9;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }

  .counter-text{
    color: var(--gray-200, #D9D9D9);
font-family: Inter;
font-size: 12px;
font-style: normal;
font-weight: 700;
line-height: normal;
  }
}
</style>
