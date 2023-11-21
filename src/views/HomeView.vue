<script setup lang="ts">
import LogInForm from '@/components/LogInForm/LogInForm.vue';
</script>

<template>
  <main>
      <img src="../assets/icon-general.svg" alt="icon" class="icon-style"/>
      <LogInForm />
  </main>
</template>

<style scoped lang="scss">
  @import '../global-css.scss';
  main{
    display: flex;
    column-gap: $m4;
    max-height: 100%;
    box-sizing: border-box;
    height:100%;
  }

  .icon-style{
    width:auto;
    @media (max-width: 640px) {
      display: none;
    }
  }

</style>