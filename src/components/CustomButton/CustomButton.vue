<script setup lang="ts">
defineProps<{
  onClick: () => void
  text: string
}>()
</script>

<template>
  <div class="wrapper-button" @click="onClick">
    {{ text }}
  </div>
</template>

<styles scoped lang="scss">
@import '../../global-css.scss';
.wrapper-button {
  background-color: $blue;
  color: white;
  padding: $m1 $m4;
  min-height: $m5;
  width: 100%;
  border-radius: $m1;
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  box-sizing: border-box;
}
</styles>
