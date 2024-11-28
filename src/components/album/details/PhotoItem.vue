<template>
  <v-card data-test="photo-item-card"
          class="rounded-0"
          max-width="300"
          max-height="300"
          variant="flat">

        <v-img data-test="photo-url"
               :src="image"
               width="300"
               height="300"
               alt="description"
               class="image"/>
  </v-card>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true
  }
})

</script>

<style scoped>
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
  padding: 0;
}

</style>