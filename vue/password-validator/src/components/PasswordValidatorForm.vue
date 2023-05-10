<script setup lang="ts">
import PasswordValidatorForm from "@/components/PasswordValidatorForm.vue";
defineProps<{
  msg: string
}>()
</script>

<template>
    <h1>Password Validator</h1>
    <div>
      <span>{{ msg }}</span>
    </div>
</template>
