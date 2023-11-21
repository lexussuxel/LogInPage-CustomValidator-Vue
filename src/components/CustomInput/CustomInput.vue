<script setup lang="ts">
import {ref} from "vue";
defineProps<{
  password?: boolean;
  errors: string[];
  placeholder?: string;
  textValue: string | number;
  onChange: (arg0: string) => void;
}>()

    let showPassword = ref(false);

    const changeShowPassword = () => {
        console.log(showPassword)
        showPassword.value = !showPassword.value
    }

    const returnErrorString = (arr: string[]) => {
        const joined = arr.join(', ')
        return joined.charAt(0).toUpperCase() + joined.slice(1);
    }

</script>

<template>
    <div class="wrapper-input">
        <input 
        v-if="password && !showPassword"
        :placeholder="placeholder"
        :value="textValue"
        @input="event => onChange((event.target as HTMLInputElement).value.toString() || textValue.toString())"
        type="password"
        />
        <input 
        v-if="!password || showPassword"
        :placeholder="placeholder"
        :value="textValue"
        @input="event => onChange((event.target as HTMLInputElement).value.toString() || textValue.toString())"
        type="text"
        />
        <img v-if="password && showPassword" src="../../assets/eye-closed.svg" alt="hide password" @click="changeShowPassword"/>
        <img v-if="password && !showPassword" src="../../assets/eye-open.svg" alt="show password" @click="changeShowPassword"/>
    </div>
    <div v-if="errors.length" class="error-wrapper">
        <img alt="error" src="../../assets/warning.svg" />
        <span>{{ returnErrorString(errors) }}</span> 
    </div>
</template>


<style scoped lang="scss">
    @import './styles.scss';
</style>