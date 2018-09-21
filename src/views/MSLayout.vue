<template>
  <!-- <v-container> -->
  <v-container v-bind="{ [`grid-list-sm`]: true }">
    <!-- <v-layout row wrap>
      <v-flex v-bind="{ [`xs${size}`]: true }"  v-for="n in 8" :key="n">
        <portlet
         :size="size"
         :height="height"
          type='barChart'
          :showActionbar="showActionbar"
          :showToolbar="showToolbar"
          :series="series"
          :chartConfig="config" />
      </v-flex>
      </v-layout> -->
      <v-layout row >
        <v-flex xs8>
          <portlet
           :size="size"
           :height="height"
            type='barChart'
            :showActionbar="showActionbar"
            :showToolbar="showToolbar"
            :series="series"
            :chartConfig="config" />
        </v-flex>

        <v-layout column >
          <v-flex xs2 v-for="n in 4" :key="n">
            <portlet
             :size="size"
             :height="0.95*height/4"
              type='barChart'
              :showActionbar="showActionbar"
              :showToolbar="showToolbar"
              :series="seriessmall[n]"
              :chartConfig="configsmall" />
          </v-flex>
          </v-layout>
      </v-layout>
  </v-container>
</template>

<script>

import Portlet from '@/components/Portlet.vue'

export default {
  components: {
    Portlet
  },

  props: {
    showActionbar: Boolean,
    showToolbar: Boolean,
    nColumns: Number,
    height: Number
  },

  created () {
    console.log('showAction', this.showActionbar)
  },

  computed: {
    configsmall: function () {
      return {
        ...this.config,
        margin: {
          top: 5,
          right: 5,
          bottom: 50,
          left: 5,
        },
        primaryValuesAxis: {
          labels: false,
          line: false
        },
        secondaryValuesAxis: {
          labels: false,
          line: false
        },
        categoriesAxis: {
          labels: false
        },
        showVersion: false
      }
    },
    seriessmall: function () {
      return [[this.series1], [this.series2], [this.series3], [this.series4], [this.series5]]
    },

    size: function () {
      return 12/this.nColumns
    },
    series: function () {
      return [
        this.series1,
        // this.series2,
        // this.series3,
        this.series4
        // this.series5,
        // this.series6
      ]
    }
  },
  data: () => ({
    config:
      {
        // chart properties
        mergeSeriesCategories: false,
        // below setting will be the default in the next version
        xLabelsResponsiveness: [
            {
                minWidth: 600,
                extendTicks: {
                    value: true,
                    consistent: true,
                },
            },
            {
                minWidth: 300,
                truncateLabels: {
                    value: 3,
                    consistent: true,
                },
                extendTicks: {
                    value: true,
                    consistent: true,
                },
            },
            {
                extendTicks: {
                    value: true,
                    consistent: true,
                },
                truncateLabels: {
                    value: 1,
                    consistent: true,
                },
            },
        ],
        // bars properties
        categoriesKey: 'month',
        valuesKey: 'temp',
        categoriesLabel: 'Month',
        valuesLabel: 'Fahrenheit',
        orientation: 'vertical',
        barWidth: 50,
        mainDataColor: 'grey',
        forecastStart: 'June',
        forecastOpacity: 34,
        insetBarsColor: 'black',
        insetBarWidth: 75,
        dataLabelsOverBars: true,
        dataLabelsMargin: 6,
        dataLabelsSize: 12,
        dataOuterPadding: 20,
        // dots properties
        dotMaxDiameter: 10,
        // bullets properties
        bulletBarWidth: 12,
        bulletBarsColor: 'maroon',
        // lines properties
        noBreaks: false,
        dashed: false,
        undecorated: false
      },

    series1: {
      // type: 'default' // intentionally left out
      order: 0,
      categoriesSetter: true,
      type: 'bar',
      data: [
        { humidity: 10, temp: 32, month: 'January' },
        { humidity: 15, temp: 0, month: 'February' },
        { humidity: 15, temp: null, month: 'March' },
        { humidity: 20, temp: null, month: 'April' },
        { humidity: 24, temp: null, month: 'May' },
        { humidity: 15, temp: null, month: 'June' },
        { humidity: 5, temp: 72, month: 'July' },
        { humidity: 5, temp: 53, month: 'August' },
        { humidity: 12, temp: 36, month: 'September' },
        { humidity: 24, temp: 64, month: 'October' },
        { humidity: 40, temp: 30, month: 'November' },
        { humidity: 30, temp: 37, month: 'December' },
      ]
    },

    series2: {
      // type: 'bullet',
      order: 0,
      data: [
        { temp: 20, month: 'May' },
        { temp: 10, month: 'June' },
        { temp: 72, month: 'July' },
        { temp: null, month: 'August' },
        { temp: 36, month: 'September' },
        { temp: 64, month: 'October' },
        { temp: 30, month: 'November' },
        { temp: 37, month: 'December' }
      ],
    },

    series3: {
      type: 'inset',
      order: 7,
      data: [
        { temp: 20, month: 'April' },
        { temp: null, month: 'May' },
        { temp: 70, month: 'September' },
        { temp: 20, month: 'November' }
      ]
    },

    series4: {
      assignedTo: 'secondary',
      type: 'bar',
      order: 4,
      data: [
        { temp: 0.7, month: 'January' },
        { temp: 0.8, month: 'February' },
        { temp: 0.7, month: 'August' },
        { temp: null, month: 'September' },
        { temp: 0.9, month: 'October' },
        { temp: 0.4, month: 'November' },
        { temp: 0.5, month: 'December' },
      ]
    },

    series5: {
      type: 'dot',
      order: 5,
      data: [
        { temp: 30, month: 'January' },
        { temp: 20, month: 'February' },
        { temp: null, month: 'March' },
        { temp: 15, month: 'April' }
      ]
    },
    series6: {
      type: 'line',
      order: 1,
      nobreak: true,
      dataLabels: true,
      data: [
        { temp: 30, month: 'January' },
        { temp: 20, month: 'February' },
        { temp: null, month: 'March' },
        { temp: 15, month: 'April' }
      ]
    }

  })
}
</script>

<style scoped>

.container {
  margin-top: 80px;
}
</style>
