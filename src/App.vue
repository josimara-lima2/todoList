<script setup>
import ContainerCreateTask from "./components/ContainerCreateTask.vue";
import ListaTasks from "./components/ListaTasks.vue";
import ContainerInfo from "./components/ContainerInfo.vue";
import ListaVazia from "./components/ListaVazia.vue";
import { onMounted, ref, watch, provide } from "vue";
import OHeader from "./components/OHeader.vue";
const tasks = ref([]);
const tasks_criadas = ref(0);
const tasks_concluidas = ref(0);
const getTasksLocalStorage = () => {
  const tasksList = localStorage.getItem("tasks") || [];
  console.log(tasksList);

  if (tasksList.length === 0) {
    tasks.value = [];
    return;
  }
  tasks.value = JSON.parse(tasksList);
};

const calcularConcluidas = () => {
  tasks_concluidas.value = tasks.value.filter(
    (item) => item.concluida === true
  ).length;
};

watch(
  () => [tasks.value],
  () => {
    console.log("mudou");
    tasks_criadas.value = tasks.value.length;
    calcularConcluidas();
  },
  { deep: true }
);

const addNewItemTasks = (obj) => {
  console.log("chamou");
  tasks.value.push(obj);
};

const concluir = (task) => {
  console.log(tasks.value, task);
  const index = tasks.value.findIndex((item) => item.id === task.id);
  if (index >= 0) {
    tasks.value.splice(index, 1, task);
  }
  localStorage.setItem("tasks", JSON.stringify([...tasks.value]));
};

const removeTask = (task) => {
  tasks.value = tasks.value.filter((item) => item.id !== task.id);
  localStorage.setItem("tasks", JSON.stringify([...tasks.value]));
};
provide("tasks", { tasks, addNewItemTasks, concluir, removeTask });

onMounted(() => {
  getTasksLocalStorage();

  tasks_criadas.value = tasks.value.length;
});
</script>

<template>
  <div
    class="max-h-screen overflow-hidden w-full flex flex-col items-center justify-center"
  >
    <OHeader />
    <div class="mt-0 max-w-[56rem] w-max md:w-[95vw] pb-40">
      <ContainerCreateTask />
      <ContainerInfo
        :tasks_concluidas="tasks_concluidas"
        :tasks_criadas="tasks_criadas"
      />
      <ListaTasks v-if="tasks_criadas > 0" />
      <ListaVazia v-else />
    </div>
  </div>
</template>

<style scoped>
/* Scrollbar styles */

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #d9d9d9 #8284fa;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-track {
  background: #d9d9d9;
  border-radius: 20px;
}

*::-webkit-scrollbar-thumb {
  background-color: #8284fa;

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
}
</style>
