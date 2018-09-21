<template>
  <div
    id="e3"
    style="max-width: 400px; margin: auto;"
    class="grey lighten-3"
  >

    <v-toolbar
      color="pink"
      dark
    >
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Daily Sales</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card>
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex xs12>
            <v-card color="white">
              <v-layout fill-height align-center justify-center>
                <!-- <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">Daily Sales</div>
                      <div>Ellie Goulding</div>
                      <div>(2013)</div>
                    </div>
                  </v-card-title>
                </v-flex> -->
                <v-flex xs5>
                  <portlet min-height=40 type='barChart' width='200px'
                    :config="{orientation: 'vertical', mergeSeriesCategories: false, valuesKey: 'humidity'}" :series="series" />
                  <!-- <v-card-media
                    src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
                    height="125px"
                    contain
                  ></v-card-media> -->
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions>
                   <v-spacer></v-spacer>
                   <v-btn icon>
                     <v-icon>favorite</v-icon>
                   </v-btn>
                   <v-btn icon>
                     <v-icon>bookmark</v-icon>
                   </v-btn>
                   <v-btn icon>
                     <v-icon>share</v-icon>
                   </v-btn>
                 </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import Portlet from '@/components/Portlet.vue'

  export default {
    name: 'd-portlet',
    components: {
      Portlet
    },
    data: () => {
      return {
        series: [{
          // type: 'default' // intentionally left out
          order: 0,
          // type: 'line',
          data: [
            { humidity: 10, temp: 32, month: 'January' },
            { humidity: 15, temp: 0, month: 'February' },
            { humidity: 15, temp: 33, month: 'March' },
            { humidity: 20, temp: 37, month: 'April' },
            { humidity: 24, temp: 40, month: 'May' },
            { humidity: 15, temp: 60, month: 'June' },
            { humidity: 5, temp: 72, month: 'July' },
            { humidity: 5, temp: 53, month: 'August' },
            { humidity: 12, temp: 36, month: 'September' },
            { humidity: 24, temp: 64, month: 'October' },
            { humidity: 40, temp: 30, month: 'November' },
            { humidity: 30, temp: 37, month: 'December' },
          ]
        }]
      }
    }
  }
</script>

<style scoped>

</style>
