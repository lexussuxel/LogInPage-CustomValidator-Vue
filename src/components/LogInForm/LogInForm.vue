<script setup lang="ts">
import CustomInput from '@/components/CustomInput/CustomInput.vue'
import CustomButton from '@/components/CustomButton/CustomButton.vue'
import { ref } from 'vue';
import { FormValidator } from '../../hooks/useValidate'
import router from '@/router';

interface FormProps {
  name: string;
  email: string;
  password: string;
  repPassword: string;
}

const form = new FormValidator<FormProps>({
  name: {
    value: ref(''),
    restrictions: {
      required: true,
      min: 3,
      max: 20
    }
  },
  email: {
    value: ref(''),
    restrictions: {
      required: true,
      email: true
    }
  },
  password: {
    value: ref(''),
    restrictions: {
      required: true,
      min: 3,
      max: 20,
      identity: 'password'
    }
  },
  repPassword: {
    value: ref(''),
    restrictions: {
      required: true,
      min: 3,
      max: 20,
      identity: 'password'
    }
  }
})

const nameErrors = ref(form.errors.name)
const emailErrors = ref(form.errors.email)
const passwordErrors = ref(form.errors.password)
const repPasswordErrors = ref(form.errors.repPassword)

const setName = (value: string) => {
  form.items.name.value.value = value
}
const setEmail = (value: string) => {
  form.items.email.value.value = value
}
const setPassword = (value: string) => {
  form.items.password.value.value = value
}
const setRepPassword = (value: string) => {
  form.items.repPassword.value.value = value
}
console.log(form.errors.name)

const buttonClickHandler = () => {
  console.log('aaa')
  if (form.validate())
    router.push('success')
  else{
    nameErrors.value = form.errors.name
    emailErrors.value = form.errors.email
    passwordErrors.value = form.errors.password
    repPasswordErrors.value = form.errors.repPassword
  }
  console.log(form.errors)
}
</script>

<template>
  <div class="wrapper">
    <h2>Регистрация</h2>

    <div class="inputs-wrapper">
      <CustomInput :textValue="form.items.name.value.value" placeholder="Логин:" :onChange="setName"
        :errors="nameErrors" />
      <CustomInput :textValue="form.items.email.value.value" placeholder="Email:" :onChange="setEmail"
        :errors="emailErrors" />
      <CustomInput :textValue="form.items.password.value.value" password placeholder="Пароль:" :onChange="setPassword"
        :errors="passwordErrors" />
      <CustomInput :textValue="form.items.repPassword.value.value" password placeholder="Повторите пароль:"
        :onChange="setRepPassword" :errors="repPasswordErrors" />
    </div>
    <CustomButton text="Зарегистрироваться" :onClick="buttonClickHandler" />
  </div>
</template>

<style scoped>
@import './styles.scss';
</style>
