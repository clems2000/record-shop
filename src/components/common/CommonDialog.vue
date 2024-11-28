<template>
  <v-dialog v-model="model" max-width="60%">
    <slot></slot>
  </v-dialog>
</template>

<script setup>
const model = defineModel()
</script>



<style scoped>

</style>