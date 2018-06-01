<template>
  <div>
    <v-layout row class='mt-5'>
      <v-flex xs10 offset-xs1>
        <div id="canvas" ref="canvas" :style="'width:' + cwidth + 'px; height:' + cheight + 'px;'">
        </div>
      </v-flex>
      <v-flex xs1>
        <!-- <div id="tools" class="tools"> -->
        <v-btn @click="addPortlet">Add Portlet</v-btn>
          <!-- <span class="tool"><input id="isexpert" type=checkbox onchange=toggleExpert() checked> Expert</span> -->
          <!-- <div id="expert"> -->
            <!-- <button class="tool" @click="addPortlet">New Portlet</button> -->
            <!-- <span class="tool"><input id="charts" type=checkbox checked @click="toggleCharts" >Draw charts<br/></span> -->
            <!-- <span class="tool"><input id="layout" type=checkbox onchange=toggleLayout() checked> Manhatten</span> -->
            <!-- <img  class="tool" src=assets/chart.png /> -->
          <!-- </div> -->
        <!-- </div> -->
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import Vue from 'vue'
  import { Layout } from '@/components/manhatten'
  import Portlet from '@/components/Portlet.vue'

  var _ = require('lodash')

  // var color = d3.scaleOrdinal(d3.schemeCategory10)

  export default {
    components: {
      Portlet
    },
    data: () => ({
      portlets: [],
      rwidth: 180,
      nheight: 100,
      cwidth: 100,
      cheight: 100,
      layout: null,
      test: false,
      drawCharts: true,
      seriescollection: [
      {
        // type: 'default' // intentionally left out

        data: [
          { temp: 32, month: 'January' },
          { temp: 38, month: 'February' },
          { temp: 47, month: 'March' },
          { temp: 59, month: 'April' },
          { temp: 70, month: 'May' },
          { temp: 80, month: 'June' },
          { temp: 49, month: 'November' },
          { temp: 37, month: 'December' }
        ]
      },

      {
        type: 'bullet',
        data: [
          { temp: 20, month: 'May' },
          { temp: 10, month: 'June' },
          { temp: 72, month: 'July' },
          { temp: 53, month: 'August' },
          { temp: 36, month: 'September' },
          { temp: 64, month: 'October' },
          { temp: 30, month: 'November' },
          { temp: 37, month: 'December' }
        ],
      },

      {
        type: 'inset',
        data: [
          { temp: 20, month: 'April' },
          { temp: 55, month: 'May' },
          { temp: 70, month: 'September' },
          { temp: 20, month: 'November' }
        ]
      },

      {
        type: 'candlestick',
        data: [
          { temp: 88, month: 'July' },
          { temp: 83, month: 'August' },
          { temp: 76, month: 'September' },
          { temp: 64, month: 'October' }
        ]
      },

      {
        type: 'dot',
        data: [
          { temp: 32, month: 'January' },
          { temp: 38, month: 'February' },
          { temp: 47, month: 'March' },
          { temp: 59, month: 'April' },
          { temp: 70, month: 'May' },
          { temp: 80, month: 'June' },
          { temp: 88, month: 'July' },
          { temp: 83, month: 'August' },
          { temp: 76, month: 'September' },
          { temp: 64, month: 'October' },
          { temp: 49, month: 'November' },
          { temp: 37, month: 'December' }
        ]
      }
    ]
  }),

    created: function () {
      console.log('creating...')
      this.cwidth = Math.max(960, window.innerWidth) - this.rwidth
      this.cheight =  Math.max(500, window.innerHeight) - this.nheight
      console.log('Canvas created:', this.cwidth, this.cheight)
    },

    mounted: function () {
      // let cvs = document.getElementById("canvas");

      // console.log ("Current offset:", cvs.offsetLeft, cvs.offsetTop)
      console.log('mounted...')
      this.layout = new Layout(this.portlets, this.$refs.canvas) //, { x: cvs.offsetLeft, y: cvs.offsetTop })
      console.log('w,h,n', this.cwidth, this.cheight, this.nheight)
      this.layout.delegate("select", this.addPortlet)
      // this.layout.delegate("initial", this.addPortlet)
      this.layout.delegate("draw", this.drawPortlet)
      this.layout.style("manhatten")
      // color  = d3.scale.category10()
    },

    computed: {
    },

    methods: {
      getSeries: function () {
        let nspc = _.random(1, this.seriescollection.length)
        let s = []
        for (var i = 0; i < nspc; i++) {
          s.push(this.seriescollection[_.random(0, this.seriescollection.length - 1)])
          }
        return s
      },

      // drawPage: function (page) {
      //   d3.selectAll(".tile").remove();
      //
      //   console.log('drawing page Nr ' + page.sortOrder,  page.pageLabel);
      //   var ps = page.portlets;
      //   this.portlets.length = 0;
      //
      //   for (var i = 0, p = ps[0]; p; p = ps[++i]) {
      //     p.id = p.portletid;
      //     p.data = {
      //       series : d3.shuffle([ 29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4 ]),
      //       categories : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
      //     }
      //     p.settings = {
      //       willdraw : this.drawCharts,
      //       constraints : {
      //         minSize : [],
      //         thresholds : [ {} ]
      //       }
      //     }
      //
      //     var portlet = {
      //       content :  p,
      //       layout  : new Tile(p.details.iX * this.cwidth , p.details.iY * this.cheight , p.details.iWidth * this.cwidth ,p.details.iHeight * this.cheight )
      //     }
      //     portlets.push(portlet);
      //   }
      //   console.log("data:", this.portlets )
      //   //layout.delegate("initial", newPortlet);
      //   this.layout.updateLayout();
      // },

      drawPortlet: function (content, mode) {
        // if (tile.empty()) {
        //   console.log("tile is empty");
        //   return;
        // }

        // var content = tile // tile.data()[0].content;
        // let layoutrect = tile.data()[0].layout.content
        // console.log('******************* drawPortlet **************', content.id) // , layoutrect, tile.data(), tile.data()[0])
        if (!content)
        throw new Error("tile has no content");

        // 		tile.select(".htext")
        // 		.text("Portlet Id: " + test ? content.id : content.portletid)

        //		console.log("drawing", content.id)
        //
        // tile.selectAll(".content")
        // .style("background-color", function (d) {
        //   return color (d.content.id) })

          // if (!tile.data()[0].content.settings.willdraw) {
          //   console.log('This will draw the portlet', tile.data()[0].content)
          //   console.log('drawPortlet', tile.data()[0].content)
          //   // d3.selectAll(".highcharts-container").remove();
          //   return;
          // }

          let plet = this.portlets.find(e => (e.content.id === content.id))
          // this.chartConfig['width'] = this.divSize.x // total chart width
          // this.chartConfig['height'] = this.divSize.y // total chart height
          // this.chartConfig['container'] = this.chartContainer

          // console.log("Portlet found....", 'plet:', plet, 'plet.layout.content:', plet.layout.content)
          // console.log('check ->', plet.content.series)

          // let pnode =  Vue.extend(Portlet)
          // let pvm = new pnode()
          // console.log('Vue constructor', pvm)

          // plet.content.pnode.type = plet.content.type
          plet.content.pnode.config = { orientation: plet.content.orientation }
          plet.content.pnode.series = plet.content.series
          // pvm.minHeight = 50
          // pvm.$mount('#' + content.id)
          // console.log('get element id', content.id, document.getElementById(content.id))
          let contdiv = document.getElementById(content.id)
          if (contdiv) {
            // console.log('contdiv children',contdiv.children.length)
            if (contdiv.children.length <= 0) {
              pcont = document.createElement('div')
              pcont.id = 'v' + content.id
              let pcont = contdiv.append(pcont)
              plet.content.pnode.$mount('#v' + content.id)
            }
          }
          // console.log('drawPortlet contdiv', contdiv)
          // plet.content.pnode.$el.style = 'width:' + plet.layout.content.width + 'px;'
          let layoutrect = contdiv.getBoundingClientRect()
          plet.content.pnode.width = layoutrect.width
          plet.content.pnode.height = layoutrect.height
          // plet.content.pnode.style = style
          // console.log('watcher? tile', layoutrect)
          // console.log('watcher? vnode w h',  plet.content.id, plet.content.pnode.width, plet.content.pnode.height )
        },

        toggleLayout: function () {
          var wd = $("#layout").prop("checked");
          this.layout.style(wd ? "manhatten" : "source");
          this.layout.updateLayout();
        },

        toggleExpert: function () {
          var wd = $("#isexpert").prop("checked");
          $("#expert").css("display", wd ? "block" : "none")
          if (this.layout) this.layout.updateLayout();
        },

        toggleCharts: function () {
          this.drawCharts = !this.drawCharts
          console.log('drawCharts:', this.drawCharts)
          for (var i = 0; i < this.portlets.length; i++) {
            this.portlets[i].content.settings.willdraw = this.drawCharts;
          }
          if (this.layout) this.layout.updateLayout();
        },

        addPortlet: function (portlet, mouse) {
          this.newPortlet();
          if (this.layout ) this.layout.updateLayout();
        },

        newPortlet: function () {
          // var data = [ 29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4 ]
          var pid = "p" + (this.portlets.length + 1);
          // let ctype = ['barChart', 'dotChart', 'bulletChart']
          let orient = ['horizontal', 'vertical']
          let pnode = Vue.extend(Portlet)
          let portlet = {
            content: {
              // type: ctype[this.portlets.length % 3],
              orientation: orient[this.portlets.length % 2],
              series: this.getSeries(),
              id: pid,
              pnode: new pnode(),
              settings : {
                willdraw : this.drawCharts,
                chartConfig: {
                  cwidth: 0,
                  cheight: 0,
                },
                constraints : {
                  minSize : [],
                  thresholds : [ {} ]
                }
              }
            }
          }
          this.portlets.push(portlet);
        }
      }
    }
  </script>


<style type="text/css">
/*
#tools {
  width: 100px;
  height: 300px;
}

#navigation: {
 width: 80px;
 height: 300px;
} */

/* html {
  margin: 0 0 0 0;
}

body {
  background-color: lightgrey;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
}

button {
  background-color:white;
} * /

#canvas {
  border-color: black;
  border-style: solid;
  border-width: 1px;
}
/*
.tool {
  width: 95%;
}

div.tools {
  background-color: white;
  border-color: grey;
  border-style: solid;
  border-width: 2px;
  position: absolute;
  top: 40px;
  right: 5px;
  bottom: 40px;
}

img.tool {
  background-color: white;
  border-color: lightgrey;
  border-style: solid;
  border-width: 2px;
}
*/
.tile {
  position: absolute;
  box-sizing: border-box;
  background: white;
  border-color: blue;
  border-style: solid;
  border-width: 1px;
}
/*
.header {
  border-color: green;
  border-style: solid;
  border-width: "1px";
  width: 100%;
  height:5%;
}
*/
 .content {
  border-color: red;
  border-style: solid;
  border-width: 1px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  width: 100%;
  height:100%;
}
/*
#dashsel {
  border-color: darkgrey;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  overflow-y: scroll;
  max-height: 400px;
}

#expert {
  display: block;
}

.navbtn {
  height: 50%;
} */

.resize {
  border-color: yellow;
  border-style: solid;
  border-width: 3px;
}

.handle {
  position: absolute;
  background-color: red;
  border-color: black;
  border-style: solid;
  border-width: 1px;
}

.dragging {
box-shadow: 6px 6px 12px 5px #7A7A7A;
}

line {
  stroke-width: 1;
  stroke-dasharray: 2, 2;
  stroke: lightblue;
}
</style>
