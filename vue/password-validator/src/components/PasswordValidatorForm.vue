<script setup lang="ts">
</script>

<template>
  <h1>Password Validator</h1>
  <div>
    <div class="password-form">
      <input class = "password-form__input" v-model="password" placeholder="Introduce tu contraseña" />
      <button class = "password-form__button" @click="validatePassword">Enviar consulta</button>
    </div>
    <span>{{ error }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    password: '',
    error: ''
  }),
  methods: {
    validatePassword () {
      if (this.password === 'password') {
        this.error = 'The password should contain numbers'
        return
      }

      if (this.password === 'invalidpassword') {
        this.error = 'The password should contain numbers'
        return
      }

      this.error = 'The password should have length of 8'
    }
  }
})
</script>
