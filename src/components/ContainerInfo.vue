<template>
    <div class="w-full pb-24 pt-52  flex gap-24 justify-between flex-wrap items-center">
    <div class="flex gap-8">
      <span  class="text-secondary font-bold text-sm ">Tarefas Criadas</span>
      <span class="bg-gray-400 rounded-full flex py-2 px-8 flex-col justify-center items-center gap-10"> <span class="counter-text">{{ props.tasks_criadas }}</span></span>
    </div>
    <div class="flex gap-8">
      <span class="text-primary font-bold text-sm">Concluídas</span>
  
      <span class="bg-gray-400 rounded-full flex py-2 px-8 flex-col justify-center items-center gap-10"> <span class="counter-text">{{ props.tasks_concluidas }} de {{ props.tasks_criadas }}</span></span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
    tasks_concluidas: {
        type: Number, default:0
    },
    tasks_criadas: {
        type: Number, default:0
    }
})
</script>

<style lang="css" scoped>
  .counter-text{
    color: var(--gray-200, #D9D9D9);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
</style>