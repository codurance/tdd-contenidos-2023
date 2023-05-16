<template>
  <main>
    <PasswordValidatorForm/>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PasswordValidatorForm from '@/components/PasswordValidatorForm.vue'

export default defineComponent({
  components: {
    PasswordValidatorForm
  },
  data: () => ({
  })
})
</script>
