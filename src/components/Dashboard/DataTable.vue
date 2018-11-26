<template>
  <v-flex>
    <v-toolbar dark color="#66615B">
      <v-toolbar-title>Data Table</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog1" max-width="500">
        <v-btn slot="activator" dark color="#66615B">Import database from file</v-btn>
        <import-database @closeDialog = 'dialog1 = $event' ></import-database>
      </v-dialog>
    </v-toolbar>

    <template>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items=this.$store.getters.getStocks
          :search="search"
          disable-initial-sort
          :rows-per-page-items="[5, 10]"
        >
          <template>
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
              <v-icon
                small
                class="mr-2"
                @click="editItem(props.item)"
              >edit
              </v-icon>
              <v-icon
                small
                @click="deleteItem(props.item)"
              >delete
              </v-icon>
            </td>
          </template>
        </v-data-table>
        <v-layout row justify-center>
          <v-dialog v-model="dialog2" max-width="600px">
            <v-btn slot="activator" color="#66615B" dark class="mb-2">New Item</v-btn>
            <v-card>
              <v-toolbar dark color="#66615B">
                <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <v-container grid-list-md>
                  <form @submit.prevent="save">
                    <v-layout wrap >
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.invoiceNo" label="Invoice Number*" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.invoiceDate" label="Invoice Date*" hint="Ex: MM/dd/yyyy HH:mm" :rules="[rules.invoiceDate]" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.stockCode" label="Stock Code*" required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field v-model="editedItem.quantity" label="Quantity*" hint="Ex: 12345, -12345" :rules="[rules.quantity]" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field v-model="editedItem.unitPrice" label="Unit Price*" hint="Ex: 1.23" :rules="[rules.unitPrice]" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field v-model="editedItem.customerID" label="CustomerID*" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field v-model="editedItem.country" label="Country*" required></v-text-field>
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
        </v-layout>
      </v-card>
    </template>
  </v-flex>
</template>

<script>
  import ImportDatabase from './ImportDatabase.vue'

  export default {
    data: () => ({
      search: '',
      dialog1: false,
      dialog2: false,
      headers: [
        {
          text: 'Invoice Number',
          value: 'invoiceNo',
          sortable: false,
          width: '11%',
          align: 'center'
        },
        {
          text: 'Stock Code',
          value: 'stockCode',
          sortable: false,
          width: '11%',
          align: 'center'
        },
        {
          text: 'Description',
          value: 'description',
          sortable: false,
          width: '18%',
          align: 'center'
        },
        {
          text: 'Quantity',
          value: 'quantity',
          width: '7%',
          align: 'center'},
        {
          text: 'Invoice Date',
          value: 'invoiceDate',
          width: '20%',
          align: 'center'},
        {
          text: 'Unit Price',
          value: 'unitPrice',
          with: '9%',
          align: 'center'},
        {
          text: 'Customer ID',
          value: 'customerID',
          ortable: false,
          width: '11%',
          align: 'center'
        },
        {
          text: 'Country',
          value: 'country',
          sortable: false,
          width: '11%',
          align: 'center'
        },
        {
          text: 'Actions',
          value: 'name',
          sortable: false,
          width: '11%',
          align: 'center'}
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        invoiceNo: '',
        stockCode: '',
        description: '',
        quantity: '',
        invoiceDate: '',
        unitPrice: '',
        customerID: '',
        country: ''
      },
      defaultItem: {
        id: '',
        invoiceNo: '',
        stockCode: '',
        description: '',
        quantity: '',
        invoiceDate: '',
        unitPrice: '',
        customerID: '',
        country: ''
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
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Stock' : 'Edit Stock'
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

    created () {
      this.$store.dispatch('initStocks')
    },

    components: {
      importDatabase: ImportDatabase
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.$store.getters.getStocks.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog2 = true
      },

      deleteItem (item) {
        this.$store.dispatch('deleteStock', item)
        console.log(this.$store.getters.getStocks)
      },

      close () {
        console.log(this.editedItem)
        this.dialog2 = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        let item = {
          editedIndex: this.editedIndex,
          editedItem: this.editedItem
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