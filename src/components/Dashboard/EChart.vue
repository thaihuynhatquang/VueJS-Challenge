<template>
  <v-card>
    <e-chart :options="polar"/>
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
    return {
      data: this.dataChart,
      polar: {
        title: {
          text: 'CHART',
          x: 'center',
          bottom: 'bottom'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} invoices ({d}%)'
        },
        legend: {
          data: this.dataChart
        },
        series: [{
          name: 'Country',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: this.dataChart,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
    }
  }
}
</script>

<style>

</style>