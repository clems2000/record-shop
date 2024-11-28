<template>
  <v-sheet class="vegemite">
    <v-container>{{ t('hello')}}</v-container>
    <v-sheet>

    </v-sheet>
    <v-card-text class="display-4">This is a page about what they eat down under</v-card-text>
    <br>
    <br>
    <v-btn @click="show = !show">Show me</v-btn>

    <br>
    <br>
    <v-card-text class="display-4" v-if="show" data-test="vegemite-card-test">
      <h1>Vegemite</h1>
    </v-card-text>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)

import { useI18n } from 'vue-i18n'
const { t } = useI18n()


</script>

<style>
</style>