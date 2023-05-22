<template>
  <h1>Password Validator</h1>
  <div>
    <form class="password-form">
      <input id = "passwordInput" role="input" placeholder="Pon tu contraseña"/>
      <a role="button" @click="checkCorrectPassword" class="password-form__button">Enviar consulta</a>
    </form>
    <div>
      <span v-if="passwordErrors">{{ passwordErrors }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    passwordErrors: ''
  }),
  methods: {
    checkCorrectPassword() {
        this.passwordErrors = "The password should have a length of 8"
    }
  }
})
</script>
