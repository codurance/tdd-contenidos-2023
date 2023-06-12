<script setup lang="ts">
</script>

<template>
  <h1>Password Validator</h1>
  <div>
    <section class="password-form">
      <input class="password-form__input" placeholder="Introduce tu contraseña" v-model="password">
      <button class="password-form__button" @click="validatePassword">Enviar consulta</button>
    </section>
    <article>
      <ul class="validation-messages-list">
        <li :key="error" v-for="error in errors">{{ error }}</li>
      </ul>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    password: '',
    errors: new Array<string>()
  }),
  methods: {
    validatePassword () {
      if (this.password.length < 8) {
        this.errors.push('The password should have length of 8')
      }

      if (!this.password.match(/\d+/)) {
        this.errors.push('The password should contain numbers')
      }
    }
  }
})
</script>
