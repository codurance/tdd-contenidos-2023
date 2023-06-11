<script setup lang="ts">
</script>

<template>
  <h1>Password Validator</h1>
  <div>
    <section class="password-form">
      <input type="text" placeholder="Introduce tu contraseña" v-model="password">
      <button @click="validatePassword">Enviar consulta</button>
      <p v-if="lengthError">The password should have length of 8</p>
      <p v-if="numbersError">The password should contain numbers</p>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    password: '',
    lengthError: false,
    numbersError: false
  }),
  methods: {
    validatePassword () {
      if (!this.password.match(/\d+/)) {
        this.numbersError = true
      } else {
        this.lengthError = true
      }
    }
  }
})
</script>
