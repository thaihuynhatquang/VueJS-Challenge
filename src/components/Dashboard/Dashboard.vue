<template>
  <v-container fluid justify-space-around>
    <v-layout align-center>
      <data-table></data-table>
    </v-layout>
    <v-layout fluid justify-space-around>
      <v-dialog v-model="dialog" max-width="900px">
        <v-btn slot="activator" color="#66615B" dark class="mb-2" @click="calculateChart">Show E-Chart about Invoices of Countries</v-btn>
        <e-chart :dataChart="resultChart"></e-chart>
      </v-dialog>
    </v-layout>  
  </v-container>
</template>

<script>
  import DataTable from './DataTable.vue'
  import EChart from './EChart.vue'

  export default {
    data () {
      return {
        dialog: false,
        resultChart: []
      }
    },
    components: {
      dataTable: DataTable,
      eChart: EChart
    },
    methods: {
      calculateChart () {
        if (this.resultChart.length === 0) {
          let database = this.$store.getters.getStocks
          console.log(database)
          let country = database.reduce(function (r, a) {
            r[a.country] = r[a.country] || []
            r[a.country].push(a)
            return r
          }, Object.create(null))
          console.log(country)
          let i, j
          for (i in country) {
            let invoices = country[i].reduce(function (r, a) {
              r[a.invoiceNo] = r[a.invoiceNo] || []
              r[a.invoiceNo].push(a)
              return r
            }, Object.create(null))
            country[i].invoice = Object.keys(invoices).length
          }

          let temp = Object.keys(country)
          let index = 0
          for (j in country) {
            console.log(temp[index])
            this.resultChart.push({
              'name': temp[index],
              'value': country[j].invoice
            })
            index++
          }
        }
      }
    }
  }
</script>

<style>

</style>