<script setup lang="ts">
</script>

<template>
  <h1>Password Validator</h1>
  <div>
    <div class="password-form">
      <input class = "password-form__input" placeholder="Introduce tu contraseña" />
      <button class = "password-form__button" @click="validatePassword">Enviar consulta</button>
    </div>
    <span>{{ error }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    error: ''
  }),
  methods: {
    validatePassword () {
      this.error = 'The password should have length of 8'
    }
  }
})
</script>
