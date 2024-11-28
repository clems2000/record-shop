<template>
  <v-app>
    <BaseLayout>
      <router-view/>
    </BaseLayout>
  </v-app>
</template>

<script setup>
  import BaseLayout from '@/components/layout/BaseLayout.vue'
</script>