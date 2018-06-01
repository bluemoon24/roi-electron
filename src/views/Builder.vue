<template>
  <div>
    <v-stepper non-linear>
      <v-stepper-header>
        <v-stepper-step step="1" editable>Data set</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" editable>Chart</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" editable>Behavior</v-stepper-step>
      </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
            <v-btn color="primary" @click.native="e1 = 2">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
            <v-btn color="primary" @click.native="e1 = 3">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
            <v-btn color="primary" @click.native="e1 = 1">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
          </v-stepper-content>
    </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>

</style>
