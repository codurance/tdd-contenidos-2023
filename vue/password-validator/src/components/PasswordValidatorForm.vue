<template>
  <h1>Password Validator</h1>
  <div>
    <div class="password-form">
      <input v-model="password" placeholder="Pon tu contraseña"/>
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
    password: '',
    passwordErrors: ''
  }),
  methods: {
    checkCorrectPassword () {
      if (this.password === 'abcdefghi') {
        this.passwordErrors = 'The password should contain numbers'
        return;
      }

      this.passwordErrors = 'The password should have a length of 8'

    }
  }
})
</script>
