<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
  </header>

  <div class="router-wrapper">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
  @import './global-css.scss';

   header{
    position: fixed;
    top: 0;
    height: $header-height;
    width: 100%;
    background-color: white;
    box-shadow: $box-shadow;
    padding: 0 $m4;
    box-sizing: border-box;
   }
   .router-wrapper{
    padding: calc($header-height + $m10) 0 $m10 0;
    box-sizing: border-box;
    margin: 0 auto;
    max-height: 100vh;
    height:100vh;
    width: fit-content;
   }

   @media(max-width: 640px){
  .router-wrapper{
    padding: calc($header-height + $m10) 4px $m10 4px;
    margin: unset;
    width: auto;
   }
   }
</style>
