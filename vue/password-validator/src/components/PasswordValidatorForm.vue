<script setup lang="ts">
</script>

<template>
  <h1>Password Validator</h1>
  <div>
    <div class="password-form">
      <input class = "password-form__input" v-model="password" placeholder="Introduce tu contraseña" />
      <button class = "password-form__button" @click="validatePassword">Enviar consulta</button>
    </div>
    <ul class="validation-messages-list">
      <li :key="error" v-for="error in errors">{{ error }}</li>
    </ul>

    <article>
      <ul class="validated-password-list__list">
        <li :key="validPassword" v-for="validPassword in validPasswords">{{ validPassword }}</li>
      </ul>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    password: '',
    validPasswords: new Array<string>(),
    errors: new Array<string>()
  }),
  methods: {
    validatePassword () {
      this.errors = new Array<string>()
      if (!this.hasPasswordAnyNumber()) {
        this.errors.push('The password should contain numbers')
      }

      if (this.hasPasswordEnoughLength()) {
        this.errors.push('The password should have length of 8')
      }

      if (this.hasErrors()) {
        this.validPasswords.push(this.password)
      }
    },
    hasErrors () {
      return this.errors.length === 0
    },
    hasPasswordAnyNumber () {
      return this.password.match(/\d+/)
    },
    hasPasswordEnoughLength () {
      return this.password.length < 8
    }
  }
})
</script>
