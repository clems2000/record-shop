<template>
  <v-toolbar>
    <template v-slot:prepend>
      <v-list-item class="record-shop" data-test="record-shop-page-link"><router-link to="/">Record Shop</router-link></v-list-item>
      <v-list-item class="link-style" data-test="about-page-link"><router-link to="/about">About</router-link></v-list-item>
      <v-list-item class="link-style" data-test="vegemite-page-link"><router-link to="/vegemite">Vegemite</router-link></v-list-item>
      <v-list-item class="link-style" data-test="albums-page-link"><router-link to="/albums">Albums</router-link></v-list-item>
    </template>
  </v-toolbar>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>

</style>