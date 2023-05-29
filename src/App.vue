<script setup>
import { RouterLink, RouterView } from "vue-router";
import ItemTask from './components/ItemTask.vue'
import OInput from './components/OInput.vue'
import ContainerCreateTask from "./components/ContainerCreateTask.vue";
import ListaTasks from "./components/ListaTasks.vue";
import { inject, onMounted, ref, watch, provide } from "vue";
import OHeader from "./components/OHeader.vue";
const tasks = ref([])
const getTasksLocalStorage = () => {
  const tasksList = localStorage.getItem('tasks');
  console.log(tasksList)


  tasks.value = JSON.parse(tasksList)
  console.log(tasks.value)
}


provide('tasks', tasks)

onMounted(() => {
  getTasksLocalStorage()
})
</script>

<template>
                <OHeader/>
                <div class="mt-72 mb-32">
                  <img src="../public/Logo.png" />
                </div>
                <ContainerCreateTask />
                 <ListaTasks /> 
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
