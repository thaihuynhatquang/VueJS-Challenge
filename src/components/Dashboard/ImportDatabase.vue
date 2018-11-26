<template>
  <v-card>
    <v-container>
    <v-card-title class="headline">Choose .csv file data to import</v-card-title>
      <v-layout>
        <v-flex>
          <v-card-text>
            <em>Note: File must be have Header with fields</em>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex>
          <v-btn dark color="#66615B" @click="closeDialog" class="mb-2">Cancel</v-btn>
          <v-btn dark color="#66615B" @click.native="[$refs.fileInput.click(), closeDialog()]" class="mb-2">Import Data</v-btn>
          <input hidden type="file" multiple="false" accept=".csv" ref="fileInput" @change="loadCSV($event)">
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    dialog: Boolean
  },
  data () {
    return {
      channel_name: '',
      channel_fields: [],
      channel_entries: [],
      parse_header: ['InvoiceNo', 'StockCode', 'Description', 'Quantity', 'InvoiceDate', 'UnitPrice', 'CustomerID', 'Country'],
      parse_csv: [],
      sortOrders: {},
      sortKey: ''
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$emit('closeDialog', this.dialog)
    },
    onFocus () {
      if (!this.disabled) {
        debugger
        this.$refs.fileInput.click()
      }
    },
    sortBy: function (key) {
      var vm = this
      vm.sortKey = key
      vm.sortOrders[key] = vm.sortOrders[key] * -1
    },
    csvJSON (csv) {
      var vm = this
      var lines = csv.split('\n')
      var result = []
      var headers = vm.parse_header

      lines.map(function (line, indexLine) {
        if (indexLine < 1) return // Jump header line

        var obj = {}
        var currentline = line.split(',')

        headers.map(function (header, indexHeader) {
          obj[header] = currentline[indexHeader]
        })
        console.log(obj)
        result.push(obj)
      })

      result.pop() // remove the last item because undefined values
      return result // JavaScript object
    },
    loadCSV (e) {
      var vm = this
      if (window.FileReader) {
        var reader = new FileReader()
        reader.readAsText(e.target.files[0])
        // Handle errors load
        reader.onload = function (event) {
          var csv = event.target.result
          vm.parse_csv = vm.csvJSON(csv)
          console.log(vm.parse_csv)
        }
        reader.onerror = function (evt) {
          if (evt.target.error.name === 'NotReadableError') {
            alert('Cannot read file !')
          }
        }
      } else {
        alert('FileReader are not supported in this browser.')
      }
    }
  }
}
</script>

<style>

</style>