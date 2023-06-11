<script setup lang="ts">
</script>

<template>
  <h1>Password Validator</h1>
  <div>
    <section class="password-form">
      <input type="text" placeholder="Introduce tu contraseña">
      <button>Enviar consulta</button>
      <p>The password should have length of 8</p>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
  })
})
</script>
