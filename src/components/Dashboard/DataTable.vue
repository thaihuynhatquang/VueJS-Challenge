<template>
  <v-flex>
    <v-toolbar dark color="#66615B">
      <v-toolbar-title v-if="$vuetify.breakpoint.width > 620">Data Table</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog.dialog2" max-width="600px">
        <v-btn slot="activator" color="#66615B" dark class="mb-2">New Data</v-btn>
        <v-card>
          <v-toolbar dark color="#66615B">
            <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container grid-list-md>
              <form @submit.prevent="save">
                <v-layout wrap >
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="initData.editedItem.invoiceNo" label="Invoice Number*" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="initData.editedItem.invoiceDate" label="Invoice Date*" hint="Ex: MM/dd/yyyy HH:mm" :rules="[rules.invoiceDate]" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="initData.editedItem.stockCode" label="Stock Code*" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="initData.editedItem.description" label="Description"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="initData.editedItem.quantity" label="Quantity*" hint="Ex: 12345, -12345" :rules="[rules.quantity]" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="initData.editedItem.unitPrice" label="Unit Price*" hint="Ex: 1.23" :rules="[rules.unitPrice]" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="initData.editedItem.customerID" label="CustomerID*" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-autocomplete v-model="initData.editedItem.country" :items="initData.listCountry" label='Country*' required>
                      <v-slide-x-reverse-transition slot="append-outer" mode="out-in"></v-slide-x-reverse-transition>
                    </v-autocomplete>
                  </v-flex>                                             
                </v-layout>
                <v-card-actions>
                  <v-flex text-xs-center>
                    <v-btn dark color="#66615B" @click="close">Cancel</v-btn>
                    <v-btn dark color="#66615B" type="submit">Save</v-btn>
                  </v-flex>
                </v-card-actions>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-btn class="white--text" color="#66615B" @click="reloadData">
        Reload Data
      </v-btn>
      <v-dialog v-model="dialog.dialog1" max-width="500">
        <v-btn slot="activator" dark color="#66615B">Import from file</v-btn>
        <import-database @closeDialog='dialog.dialog1=$event' @showSnackbar='showSnackbar($event)'></import-database>
      </v-dialog>
    </v-toolbar>
    <template>
      <v-card>
        <v-card-title>
          <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="initData.headers" :items="this.$store.getters.getStocks" :search="search" disable-initial-sort :rows-per-page-items="[10, 5]">
          <template slot="no-data">
            <v-progress-linear :indeterminate="true" color="#66615B"></v-progress-linear>              
          </template>
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.invoiceNo }}</td>
            <td class="text-xs-center">{{ props.item.stockCode }}</td>
            <td class="text-xs-left">{{ props.item.description }}</td>
            <td class="text-xs-center">{{ props.item.quantity }}</td>
            <td class="text-xs-center">{{ props.item.invoiceDate }}</td>
            <td class="text-xs-center">{{ props.item.unitPrice }}</td>
            <td class="text-xs-center">{{ props.item.customerID }}</td>
            <td class="text-xs-center">{{ props.item.country }}</td>
            <td class="justify-center layout px-0">
              <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
              <v-icon small @click="deleteItem(props.item)">delete</v-icon>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </template>
    <v-snackbar top v-model="snackbar.value" :color="snackbar.colorSnackbar" :timeout="snackbar.snackbarTimeout">
      <v-icon>check_circle</v-icon>
      <v-btn color="#66615B" flat @click="snackbar.value = false">{{snackbar.snackbarMessage}}</v-btn>
    </v-snackbar>
  </v-flex>
</template>

<script>
  import ImportDatabase from './ImportDatabase.vue'
  import listCountry from '../../data/countries'
  import headers from '../../data/headerData.js'

  export default {
    data () {
      return {
        stocks: [],
        search: '',
        dialog: {
          dialog1: false,
          dialog2: false
        },
        snackbar: {
          value: false,
          snackbarMessage: '',
          snackbarTimeout: 1000,
          colorSnackbar: 'white'
        },
        initData: {
          listCountry: listCountry,
          headers: headers,
          editedIndex: -1,
          editedItem: {id: '', invoiceNo: '', stockCode: '', description: '', quantity: '', invoiceDate: '', unitPrice: '', customerID: '', country: ''},
          defaultItem: {id: '', invoiceNo: '', stockCode: '', description: '', quantity: '', invoiceDate: '', unitPrice: '', customerID: '', country: ''}
        },
        rules: {
          required: value => (!!value || value === '') || 'Required.',
          quantity: value => {
            const pattern = /^-?\d+$/
            return (pattern.test(value) || value === '') || 'Must be Negative or Positive numbers.'
          },
          unitPrice: value => {
            const pattern = /^-?\d+(\.\d+)?$/
            return (pattern.test(value) || value === '') || 'Must be Rational number.'
          },
          invoiceDate: value => {
            const pattern = /^\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2}$/
            return (pattern.test(value) || value === '') || 'Ex: MM/dd/yyyy HH:mm'
          }
        }
      }
    },
    computed: {
      formTitle () {
        return this.initData.editedIndex === -1 ? 'New Stock' : 'Edit Stock'
      }
    },

    watch: {
      dialog1 (val) {
        val || this.close()
      },
      dialog2 (val) {
        val || this.close()
      }
    },

    mounted () {
      this.loadData()
      console.log(this.$store.getters.getUser)
    },

    components: {
      importDatabase: ImportDatabase
    },

    methods: {
      loadData () {
        this.$store.dispatch('setStocks', [])
        this.$store.dispatch('initStocks')
      },
      reloadData () {
        this.loadData()
        this.showSnackbar('Reload successully')
      },
      showSnackbar (message) {
        this.snackbar.snackbarMessage = message
        this.snackbar.value = true
      },
      editItem (item) {
        this.initData.editedIndex = this.$store.getters.getStocks.indexOf(item)
        this.initData.editedItem = Object.assign({}, item)
        this.dialog.dialog2 = true
      },
      deleteItem (item) {
        if (confirm('Are you sure you want to delete this item?') === true) {
          this.$store.dispatch('deleteStock', item)
          this.showSnackbar('Delete item successully')
          console.log(this.$store.getters.getStocks)
        }
      },
      close () {
        this.dialog.dialog2 = false
        setTimeout(() => {
          this.initData.editedItem = Object.assign({}, this.initData.defaultItem)
          this.initData.editedIndex = -1
        }, 300)
      },
      save () {
        this.showSnackbar('Update data successully')
        let item = {
          editedIndex: this.initData.editedIndex,
          editedItem: this.initData.editedItem
        }
        this.$store.dispatch('updateStocks', item)
        this.close()
        console.log(this.$store.getters.getStocks.length)
      }
    }
  }
</script>

<style>

</style>