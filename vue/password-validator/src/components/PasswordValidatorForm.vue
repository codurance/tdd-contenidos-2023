<template>
  <h1>Password Validator</h1>
  <div>
    <div class="password-form">
      <input v-model="password" placeholder="Pon tu contraseña"/>
      <button @click="checkCorrectPassword" class="password-form__button">Enviar consulta</button>
    </div>
    <div>
        <ul class='validation-messages-list'>
          <li :key="errors" v-for="errors in passwordErrors">{{ errors }}</li>
        </ul>
    </div>
    <article>
      <ul class='validated-password-list__list'>
        <li :key="validPassword" v-for="validPassword in passwordsValid">{{ validPassword }}</li>
      </ul>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data: () => ({
    password: '',
    passwordErrors: new Array<string>(),
    passwordsValid: new Array<string>()
  }),
  methods: {
    checkCorrectPassword () {
      this.passwordErrors = new Array<string>()

      if (!this.password.match(/[0-9]+/)) {
        this.passwordErrors.push('The password should contain numbers')
      }

      if (this.password.length < 8) {
        this.passwordErrors.push('The password should have a length of 8')
      }

      if (this.hasThePasswordErrors()) {
        return
      }

      this.passwordsValid.push(this.password)
    },
    hasThePasswordErrors () {
      return this.passwordErrors.length !== 0
    }
  }
})
</script>
