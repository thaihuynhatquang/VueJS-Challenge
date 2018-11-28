<template>
  <v-card>
    <v-layout justify-center column>
      <v-flex align-center justify-space-between column fill-height>
        <e-chart :options="pie"/>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

export default {
  props: {
    dataChart: Array
  },

  components: {
    'e-chart': ECharts
  },
  data () {
    let chart = this.dataChart
    return {
      pie: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} invoices ({d}%)'
        },
        legend: {
          data: chart
        },
        series: [{
          name: 'Country',
          type: 'pie',
          data: chart,
          radius: '45%',
          center: ['50%', '60%'],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          animationDuration: 3000
        }]
      }
    }
  }
}
</script>

<style>

</style>