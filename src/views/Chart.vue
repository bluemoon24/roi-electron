<template>
  <div>
    <v-layout row>
      <v-flex xs12>
      <portlet min-height=80 type='barChart'
        :config="{orientation: 'vertical', mergeSeriesCategories: false, valuesKey: 'humidity'}" :series="series" />
    </v-flex>
  </v-layout>
</div>
</template>

<script>

import Portlet from '@/components/Portlet.vue'

export default {
  components: {
    Portlet
  },
  computed: {
    // flexseries: function () {
    //
    // },
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
    categories: [
      {
        text: 'Month',
        value: 'month',
        ordered: true,
        data: [
          {label: 'January', value: 1},
          {label: 'February', value: 2},
          {label: 'March', value: 3},
          {label: 'April', value: 4},
          {label: 'May', value: 5},
          {label: 'June', value: 6},
          {label: 'July', value: 7},
          {label: 'August', value: 8},
          {label: 'September', value: 9},
          {label: 'October', value: 10},
          {label: 'November', value: 11},
          {label: 'December', value: 12}
        ]
      },
      {
        text: 'Product',
        value: 'product',
        ordered: false,
        data: [
          {label: 'Dermatology', value: 'derma'},
          {label: 'Nutritionals', value: 'nutrition'},
          {label: 'Analgesics', value: 'analgesics'},
          {label: 'Digestive Health', value: 'digestive-health'},
          {label: 'Cough and Cold', value: 'coughncold'},
          {label: 'Foot Care', value: 'fc'},
          {label: 'Sun Care', value: 'sc'},
          {label: 'Cardiovascular Risk Prevention', value: 'crp'}
        ]
      }
    ],
    newseries: {
      units: {netsales: 'eur', volume: 'pce'},
      valuesKeys: ['netsales', 'volume'],
      categoriesKey: ['month', 'product'],
      data:[
        { month: 1, product: 'derma', netsales: 2000000, volume: 1200 },
        { month: 2, product: 'derma', netsales: 2020000, volume: 900 },
        { month: 3, product: 'derma', netsales: 2100000, volume: 800 },
        { month: 1, product: 'nutrition', netsales: 310000, volume: 20 },
        { month: 2, product: 'nutrition', netsales: 3500000, volume: 300 },
        { month: 3, product: 'nutrition', netsales: 2900000, volume: 400 },
        { month: 1, product: 'analgesics', netsales: 100000, volume: 45000 },
        { month: 2, product: 'analgesics', netsales: 200000, volume: 55000 },
        { month: 3, product: 'analgesics', netsales: 150000, volume: 58000 },
        { month: 1, product: 'digestive-health', netsales: 503000, volume: 107000 },
        { month: 2, product: 'digestive-health', netsales: 501000, volume: 120000 },
        { month: 3, product: 'digestive-health', netsales: 506000, volume: 103000 },
        { month: 1, product: 'fc', netsales: 2100, volume: 100 },
        { month: 2, product: 'fc', netsales: 2200, volume: 120 },
        { month: 3, product: 'fc', netsales: 2900, volume: 220 }
      ]
    },
    series1: {
      // type: 'default' // intentionally left out
      order: 0,
      // type: 'line',
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
      categoriesSetter: false,
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
