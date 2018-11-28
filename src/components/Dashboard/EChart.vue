<template>
  <v-card>
    <v-container>
      <v-layout>
        <v-flex>
          <e-chart :options="data"/>
        </v-flex>
      </v-layout>
      </v-container>
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
    console.log(chart)
    return {
      data: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} invoices ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 'right',
          data: chart
        },
        series: [{
          name: 'Country',
          type: 'pie',
          data: chart,
          radius: '55%',
          center: ['50%', '60%'],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          animationDuration: 4000
        }]
      }
    }
  }
}
</script>

<style>

</style>