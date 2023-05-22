<template>
  <h1>Password Validator</h1>
  <div>
    <div class="password-form">
      <input placeholder="Pon tu contraseña"/>
      <button @click="checkCorrectPassword" class="password-form__button">Enviar consulta</button>
    </div>
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
