<template>
  <v-sheet class="vegemite">
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

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style>
</style>