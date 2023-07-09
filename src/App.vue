<script setup>
import { RouterLink, RouterView } from "vue-router";
import ItemTask from './components/ItemTask.vue'
import OInput from './components/OInput.vue'
import ContainerCreateTask from "./components/ContainerCreateTask.vue";
import ListaTasks from "./components/ListaTasks.vue";
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
provide('tasks', {tasks, addNewItemTasks, concluir})

onMounted(() => {
   getTasksLocalStorage()
   console.log(tasks.value)
  tasks_criadas.value = tasks.value.length
})
</script>

<template>
<div class="max-h-screen overflow-hidden ">
  <OHeader/>
  <div class="mt-72 mb-32 items-center flex w-full justify-center">
    <img src="../public/Logo.png" />
  </div>
  <ContainerCreateTask />
  <div class="w-full py-24 flex gap-24 justify-between items-center">
    <div class="flex gap-16">
      <span>Tarefas Criadas</span>
      <span>{{ tasks_criadas }}</span>
    </div>
    <div class="flex gap-16">
      <span>Concluidas</span>
      <span> {{ tasks_concluidas }} de {{ tasks_criadas }}</span>
    </div>
  </div>
   <ListaTasks /> 
</div>
</template>

<style scoped>


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
}
</style>
