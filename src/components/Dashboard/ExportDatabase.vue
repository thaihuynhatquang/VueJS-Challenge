<template>
  <v-card>
    <v-container>
      <v-card-title class="headline">Save Datatable</v-card-title>
      <v-layout>
        <v-flex>
          <v-card-text>
            <em><strong>Note:</strong> If save file as .xls, skip warning of Office and this content will be rendered perfectly </em>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-layout>
          <v-flex>
            <v-radio-group v-model="type" row>
              <v-radio label="Save as .xls" value="xls" color="#66615B"></v-radio>
              <v-radio label="Save as .csv" value="csv" color="#66615B"></v-radio>
            </v-radio-group>
          </v-flex>
      </v-layout> 
      <v-layout>
        <v-flex>
          <download-data :data="data" :fields="header" :type="type">
              Download Data
          </download-data>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import DownloadData from 'vue-json-excel'

export default {
  data () {
    let datatable = this.$store.getters.getStocks
    return {
      data: datatable,
      type: 'xls',
      header: {
        'Invoice Number': 'invoiceNo',
        'Stock Code': 'stockCode',
        'Description': 'description',
        'Quantity': 'quantity',
        'Invoice Date': 'invoiceDate',
        'Unit Price': 'unitPrice',
        'Country': 'country',
        'CustomerID': 'customerID'
      }
    }
  },
  components: {
    downloadData: DownloadData
  }
}
</script>

<style>

</style>
