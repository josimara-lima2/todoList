<template>
  <div class="header">
    <div class="items-center flex w-full justify-center">
      <img :src="logo" />
    </div>
  </div>
</template>

<script setup>
import logo from "../assets/Logo.png";
</script>

<style lang="css" scoped>
.header {
  position: sticky;
  height: 200px;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #0d0d0d;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
