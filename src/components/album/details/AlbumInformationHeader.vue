<template>

  <v-tabs bg-color="primary">
    <v-tab :to="{ name: 'albumDetails', params: {id : id}}"
           value="details"
           data-test="tab-to-details">{{ t('albumPageDetails.details')}}</v-tab>

    <v-tab :to="{ name: 'albumPhotos', params: {id : id}}"
           value="photos"
           data-test="tab-to-photos"
           :disabled="photosTabDisabled">{{ t('albumPageDetails.photos') }}</v-tab>
  </v-tabs>

</template>


<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const stringProp = defineProps({
  id: String
})

const photosTabDisabled = computed(()=> parseInt(stringProp.id) > 100)
</script>

