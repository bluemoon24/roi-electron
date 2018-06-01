<template>
  <div ref="portlet" style="margin-top: 60px;">
    <!-- {{ config }} -->
    <!-- Portlet rect: {{ portletRect }}, type: {{ type }},
    series: {{ series }}, <br/>
    chartConfig {{ chartConfig }}, <br/>
    orientation: {{ orientation }},<br/>
    chartRect: {{ d3sel }}, minHeight: {{ minHeight }}, innerHeight: {{ innerHeight }}, chartContainer: {{ chartContainer }} -->
      <div ref="chart" ></div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import roiCharts from '@/components/roi-charts'
  export default {
    props: {
      series: {
        type: Array
      },
      height: {
        type: String | Number,
        default: 100
      },
      width: {
        type: String | Number,
        default: 200
      },
      minHeight: {
        type: String,
        default: '90'
      },
      config: {
        type: Object
        // default: {}
      }
    },
    watch: {
      height: function (newheight, oldheight) {
        this.$refs.portlet.style = `height: ${newheight}px; width: ${this.width}px;`
        this.$refs.chart.style = `height: ${newheight}px; width: ${this.width}px;`
        // console.log('height watcher', `height: ${newheight}px; width: ${this.width}px;`, newheight, oldheight, this.$refs.portlet)
        this.divSize.y = newheight - 2 // 2 px portlet decoration ... currently line around the box
        this.renderChart()
        // this.onResize()
      },
      width: function (newwidth, oldwidth) {
        this.$refs.portlet.style = `width: ${newwidth}px; height: ${this.height}px;`
        this.$refs.chart.style = `width: ${newwidth}px; height: ${this.height}px;`
        // console.log('width watcher', `width: ${newwidth}px; height: ${this.height}px;`, newwidth, oldwidth, this.$refs.portlet)
        this.divSize.x = newwidth - 2 // 2 px portlet decoration ... currently line around the box
        this.renderChart()
        // this.onResize()
      }
    },
    name: 'portlet',
    data: () => ({
      divSize: {
        x: 0,
        y: 0
      },
      innerHeight: 100,
      portletRect: {},
      d3sel: {},
      portletConfig: ['categoriesKey', 'valuesKey', 'categoriesLabel', 'valuesLabel', 'orientation', 'mergeSeriesCategories'],
      chartContainer: null,
      chartConfig:
        {
          // chart properties
          mergeSeriesCategories: false,
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
    }),

    computed: {
      // width: () => (window.innerWidth * 0.8),
      // height: () => (window.innerHeight * 0.5)
    },

    created: function () {
      console.log ('portlet created')
    },

    mounted () {
      console.log('***** mounted roi-chart component ******', this.$refs)
      console.log('roiCharts version:', roiCharts.version)
      console.log('... series:', this.series)
      this.chartContainer = this.$refs.chart
      this.chartContainer.style = 'height:' + (window.innerHeight * this.minHeight / 100) + 'px;'
      this.portletRect = this.$refs.portlet.getBoundingClientRect()
      this.d3sel = this.chartContainer.getBoundingClientRect()

      console.log('***rect of chartContainer', this.d3sel)
      // this.onResize()
      // this.divSize = { x: window.innerWidth, y: window.innerHeight }
      this.renderChart()
      // let bulletChartContainer = document.querySelector('#bullet-chart');
    },
    methods: {
      renderChart: function () {
        if (this.config) {
          for (var cf in this.config) {
            // console.log('copy conf', cf, this.portletConfig.some((e => e === cf)))
            if (this.portletConfig.some(e => e === cf) && this.config.hasOwnProperty(cf)) {
              this.chartConfig[cf] = this.config[cf]
              console.log('copy config', cf, this.config[cf], this.chartConfig[cf])
            }
          }
        }
        this.chartConfig['width'] = this.divSize.x // total chart width
        this.chartConfig['height'] = this.divSize.y // total chart height
        this.chartConfig['container'] = this.$refs.chart
        console.log('chartConfig', this.chartConfig)
        console.log('series', this.series)
        this.chartConfig['series'] = this.series
        console.log(JSON.stringify(this.chartConfig))
        return roiCharts.chart(this.chartConfig)
      },
      onChartResize () {
        console.log('onChartResize', this.$refs.chart.clientWidth, this.$refs.chart.clientHeight)
      },
      onResize () {

        ///// TODO: fix resizing window
        this.innerHeight = window.innerHeight
        this.$refs.chart.style = 'height:' + (window.innerHeight * this.minHeight / 100) + 'px'
        this.divSize = { x: this.$refs.chart.clientWidth, y: this.$refs.chart.clientHeight }
        this.portletRect = this.$refs.portlet.getBoundingClientRect()
        this.onChartResize()
        this.renderChart()

        console.log("refs resize", this.$refs)
        console.log("Portlet div resize", this.type, this.divSize.x, this.divSize.y)
        console.log("Portlet boundaries", this.portletRect)
        // this.svgwidth = this.divSize.x * 0.8
        // this.svgheight = this.divSize.y * 0.5
        // if (this.initialx !== 0) this.scalex = this.svgwidth / this.initialx
        // if (this.initialy !== 0) this.scaley = this.svgheight / this.initialy
        // let scale = Math.min(this.scalex, this.scaley)
        // this.transform = 'translate(' + this.svgwidth / 2 + ',' + this.svgheight / 2 + ') ' +
        //   'scale(' + scale + ', ' + scale + ')'
        // if (this.g) this.g.attr('transform', this.transform)
      }
    }
  }
</script>

<style scoped>

</style>
