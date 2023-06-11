<script setup lang="ts">
</script>

<template>
  <h1>Password Validator</h1>
  <div>
    <section class="password-form">
      <input class="password-form__input" type="text" placeholder="Introduce tu contraseña" v-model="password">
      <button class="password-form__button" @click="validatePassword">Enviar consulta</button>
      <article>
        <ul class="validation-messages-list">
        <li v-if="lengthError">The password should have length of 8</li>
        <li v-if="numbersError">The password should contain numbers</li>
      </ul>
      </article>
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
      this.numbersError = false
      this.lengthError = false

      if (this.doesNotContainANumber()) {
        this.numbersError = true
      }

      if (this.isTooShort()) {
        this.lengthError = true
      }
    },
    doesNotContainANumber () {
      return !this.password.match(/\d+/)
    },
    isTooShort () {
      return this.password.length < 8
    }
  }
})
</script>
