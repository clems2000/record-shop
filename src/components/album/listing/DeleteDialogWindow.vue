<template>
  <v-card>
    <v-row>
      <v-col class="text-start align-self-start">
        <v-card-title>Are you sure you want to delete the "{{title}}" album?</v-card-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-end align-self-end"
             id="delete-window-buttons">
        <v-btn color="primary"
               prepend-icon="mdi-minus-circle"
               @click="$emit('closeDialog')"
               class="cancel-button"
               data-test="cancel-button" >Cancel</v-btn>
        <v-btn color="error"
               prepend-icon="mdi-delete-outline"
               @click="$emit('closeDialogWithDelete', id)"
               data-test="confirm-delete-button">Delete</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>


<script setup>
defineProps({
  id: Number,
  title: String
})


defineEmits([
  'closeDialog',
  'closeDialogWithDelete'
])


</script>


<style scoped>
.cancel-button {
  margin: 5px;
}

#delete-window-buttons {
  margin: 10px;
}
</style>