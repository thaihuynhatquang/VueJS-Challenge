<template>
  <v-card>
    <v-container>
      <v-layout row wrap>
        <v-flex text-xs-center>
          <e-chart :options="polar"/>
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
  // mounted () {
  //   this.chart = this.$store.getters.getDatachart
  //   console.log(this.chart)
  // },
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
      polar: {
        title: {
          text: 'CHART',
          x: 'center',
          bottom: 'bottom'
        },
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