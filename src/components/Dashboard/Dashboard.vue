<template>
  <v-container fluid justify-center>
    <v-layout align-center>
      <data-table></data-table>
    </v-layout>
    <v-layout fluid justify-space-around>
      <v-dialog v-model="dialog" max-width="800px">
        <v-btn slot="activator" color="#66615B" dark class="mb-2" @click='showChart'>Show E-Chart about Invoices of Countries</v-btn>
        <e-chart :key="key" :dataChart="dataChart"></e-chart>
      </v-dialog>
    </v-layout>  
  </v-container>
</template>

<script>
  import DataTable from './DataTable.vue'
  import EChart from './EChart.vue'
  import _ from 'lodash'
  
  export default {
    data () {
      return {
        dialog: false,
        key: 0,
        dataChart: []
      }
    },
    components: {
      dataTable: DataTable,
      eChart: EChart
    },
    methods: {
      showChart () {
        this.dataChart = []
        this.key ++
        let data = this.$store.getters.getStocks
        let country = _.groupBy(data, 'country')
        console.log(country)

        let i, j
        for (i in country) {
          let invoices = _.groupBy(country[i], 'invoiceNo')
          country[i].invoice = Object.keys(invoices).length
        }

        let temp = Object.keys(country)
        let index = 0
        for (j in country) {
          this.dataChart.push({
            'name': temp[index],
            'value': country[j].invoice
          })
          index++
        }
        console.log(this.dataChart)
      }
    }
  }
</script>

<style>

</style>