<template>
  <v-btn :to="{ name: 'albums'}"
         :title="address"
         prepend-icon="mdi-arrow-left"
         data-test="to-albums-button2"
         color="blue">Back</v-btn>
</template>

<script setup>
const address = 'To Albums'

</script>

<style scoped>
</style>

