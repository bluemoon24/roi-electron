<template>
  <div>

  </div>
</template>

<script>
import * as d3 from 'd3'
  export default {
    data: () => ({

    }),
    created: function () {
      // console.log(this.generateLinear(0.1, 4, 12, 0.02))
      // console.log(this.generateNormal(12, 12, 30, 0.02, 30))
    },
    methods: {
      generateNormal: function (mean, n = 12, amp = 1, v = 0, s2 = 1, offset = 0) {
        // f(x) = A * exp(-(x - mean)^2/(2*sigma^2))
        mean = mean || (n - 1) / 2
        let result = []
        let max = Math.abs(amp)
        for (var i = 0; i < n; i++) {
          result[i] = amp * Math.exp(-Math.pow(i - mean, 2) / (2 * s2)) + offset
        }
        if (!v) return result
        for (i = 0; i < n; i++) {
          result[i] += d3.randomUniform(-max * v, max * v)()
        }
        return result
      },

      generateLinear: function (a, b, n, v) {
        n = n || 12
        a = a || 1
        b = b || 0
        v = v || 0.1
        let result = []
        let max = 0
        for (var i = 0; i < n; i++) {
          result[i] = a * i + b
          max = Math.max(Math.abs(result[i]), max)
        }
        if (!v) return result
        for (i = 0; i < n; i++) {
          result[i] += d3.randomUniform(-max * v, max * v)()
        }
        return result
      }
    }
  }
</script>

<style scoped>

</style>
