<template>
  <VSnackbar>
    {{ message }}
  </VSnackbar>
</template>

<script setup>
  defineProps({
    message: String
  })
</script>

<style scoped>

</style>