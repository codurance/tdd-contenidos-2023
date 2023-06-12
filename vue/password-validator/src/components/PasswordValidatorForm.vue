<script setup lang="ts">
</script>

<template>
  <h1>Password Validator</h1>
  <div>
    <section class="password-form">
      <input placeholder="Introduce tu contraseña" v-model="password">
      <button @click="validatePassword">Enviar consulta</button>
    </section>
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
      if (this.password === 'short1') {
        this.error = 'The password should have length of 8'
      }
    }
  }
})
</script>
