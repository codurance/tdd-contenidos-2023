<template>
  <h1>Password Validator</h1>
  <div>
    <div class="password-form">
      <input v-model="password" placeholder="Pon tu contraseña"/>
      <button @click="checkCorrectPassword" class="password-form__button">Enviar consulta</button>
    </div>
    <div class='validation-messages-list'>
        <ul v-if="passwordErrors.length > 0">
          <li :key="errors" v-for="errors in passwordErrors">{{ errors }}</li>
        </ul>
    </div>
    <article class='validated-password-list__list'>
      <ul>
        <li :key="validPassword" v-for="validPassword in passwordsValid">{{ validPassword }}</li>
      </ul>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
type Errors = string[]
export default defineComponent({
  data: () => ({
    password: '',
    passwordErrors: new Array<string>(),
    passwordsValid: new Array<string>()
  }),
  methods: {
    checkCorrectPassword () {
      this.passwordErrors = new Array<string>()
      let errors = false

      if (!this.password.match(/[0-9]+/)) {
        this.passwordErrors.push('The password should contain numbers')
        errors = true
      }

      if (this.password.length < 8) {
        this.passwordErrors.push('The password should have a length of 8')
        errors = true
      }

      if (!errors) {
        this.passwordsValid.push(this.password)
      }
    }
  }
})
</script>
