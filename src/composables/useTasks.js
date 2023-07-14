import { ref } from "vue";

const tasks = ref([]);
export default function useTasks() {
  const getTasksLocalStorage = () => {
    const tasksList = localStorage.getItem("tasks") || [];
    if (tasksList.length === 0) {
      tasks.value = [];
      return;
    }
    tasks.value = JSON.parse(tasksList);
  };
  const removeTask = (task) => {
    tasks.value = tasks.value.filter((item) => item.id !== task.id);
    localStorage.setItem("tasks", JSON.stringify([...tasks.value]));
  };

  const concluir = (task) => {
    const index = tasks.value.findIndex((item) => item.id === task.id);
    if (index >= 0) {
      tasks.value.splice(index, 1, task);
    }
    localStorage.setItem("tasks", JSON.stringify([...tasks.value]));
  };

  const addNewItemTasks = (obj) => {
    tasks.value.push(obj);
  };

  return {
    getTasksLocalStorage,
    tasks,
    removeTask,
    concluir,
    addNewItemTasks,
  };
}
