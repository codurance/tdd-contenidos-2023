<template>
  <h1>Password Validator</h1>
  <div>
    <div class="password-form">
      <input v-model="password" placeholder="Pon tu contraseña"/>
      <button @click="checkCorrectPassword" class="password-form__button">Enviar consulta</button>
    </div>
    <div>
        <ul v-if="passwordErrors.length > 0">
          <li :key="errors" v-for="errors in passwordErrors">{{ errors }}</li>
        </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
type Errors = string[]
export default defineComponent({
  data: () => ({
    password: '',
    passwordErrors: new Array<string>()
  }),
  methods: {
    checkCorrectPassword () {
      if (!this.password.match(/[0-9]+/)) {
        this.passwordErrors.push('The password should contain numbers')
      }

      if (this.password.length < 8) {
        this.passwordErrors.push('The password should have a length of 8')
      }
    }
  }
})
</script>
