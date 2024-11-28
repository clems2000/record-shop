<template>
  <base-layout class="main" data-test="render-base-layout">
    This is the home page
  </base-layout>
</template>

//could test if there is a translation file! Or something there in

<script setup>
  import BaseLayout from '@/components/layout/BaseLayout.vue'
</script>

<style scoped>
  .main {
    padding-top: 0;
  }
</style>
