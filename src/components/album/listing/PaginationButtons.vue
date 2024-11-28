<template>
  <v-row class="d-flex justify-space-between">
    <v-col cols="5">
      <v-btn :disabled="prevBtnDisabled"
             @click="$emit('previousPage')"
             data-test="previous-page-button"
             color="brown">
        Previous
      </v-btn>
    </v-col>
    <v-col cols="5" class="text-right">
      <v-btn :disabled="nextBtnDisabled"
             @click="$emit('nextPage')"
             data-test="next-page-button"
             color="brown">
        Next
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
defineProps({
  prevBtnDisabled: {
    type: Boolean,
    required: true,
    default: false
  },
  nextBtnDisabled: {
    type: Boolean,
    required: true,
    default: false
  }
})

defineEmits([
  'previousPage',
  'nextPage'
])
</script>

<style scoped>

</style>