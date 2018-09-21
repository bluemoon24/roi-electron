<template>
  <v-container>
    <v-layout column >
        <v-flex xs12>
          <v-card ref="portlet">
          <v-toolbar v-if="showToolbar"
            color="toolbarConfig.color"
            light dense
            transition="v-slide-y-transition"
          >
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>{{ toolbarConfig.title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
          </v-toolbar>

          <!-- <v-card> -->
            <v-card ref="chcard" :height="'' + height" v-resize="onResize">
              <v-flex class='ma-1 pa-0' ref='chart'>
              </v-flex>
            </v-card>

            <!-- <v-divider light v-if="showActionbar"></v-divider> -->
            <v-card-actions v-if="showActionbar">
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
          <!-- </v-card> -->


      </v-card>
        </v-flex>
          </v-layout>
  </v-container>
</template>

<script>
  import roiCharts from 'roi-charts'
  export default {
    props: {
      showToolbar: {
        type: Boolean,
        default: true
      },
      showActionbar: {
        type: Boolean,
        default: false
      },
      series: {
        type: Array
      },
      height: {
        type: String | Number,
        default: 200
      },
      width: {
        type: String | Number,
        default: 600
      },
      size: {
        type: String | Number,
        default: 1
      },
      // maxHeight: {
      //   type: String,
      //   default: '75'
      // },
      // maxWidth: {
      //   type: String,
      //   default: '100'
      // },
      chartConfig: {
        type: Object,
        default: () => ({
        })
      },

      toolbarConfig: {
        type: Object,
        default: () => ({
          title: 'Portlet Title',
          color: 'white'
        })
      },

      actionbarConfig: {
        type: Object,
       default: () => ({

       })
      },

      actionMode: {
        type: Boolean,
        default: true
      }
    },
    name: 'portlet',
    data: () => ({
      divSize: {
        x: 0,
        y: 0
      },
    }),

    watch: {
      "size": "renderChart",
      "height": "renderChart"
    },

    mounted () {
      console.log('***** mounted roi-chart component ******', this.$refs)
      console.log('roiCharts version:', roiCharts.version)
      console.log('... series:', this.series)
      console.log('portlet style', this.$refs.portlet.height)
      // this.$refs.portlet.style = `height: 300}`
      // this.$refs.portlet.style = `height: ${(window.innerHeight * this.maxHeight / 100)}px;`
      // this.divSize = { x: this.$refs.chart.clientWidth, y: this.$refs.chart.clientHeight }
      this.renderChart()
    },
    methods: {
      renderChart: function () {
        console.log('card width', this.$refs.chcard.clientWidth)
        this.$refs.chart.style = `height: ${this.$refs.chcard.height}px`
        let config = {
          ...this.chartConfig,
          container:  this.$refs.chart,
          series: this.series
        }
        // console.log('chart config', JSON.stringify(config))
        return roiCharts.chart(config)
      },

      onResize: function () {
        console.log(`Resizing chart: chcard size ${this.$refs.chcard.width} ${ this.$refs.chcard.height}`)
        this.renderChart()
      }
    }
  }
</script>

<style scoped>

.container {
  padding: 0!important;
  margin: 0!important
}

</style>
