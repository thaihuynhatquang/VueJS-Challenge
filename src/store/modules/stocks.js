const firebase = require('../../firebaseConfig.js')
const state = {
  stocks: []
}

const mutations = {
  'INIT_STOCKS' (state) {
    console.log(state.stocks)
    firebase.db.collection('stocks').get()
      .then(
        querySnapshot => querySnapshot.forEach(doc => {
          let item = {
            id: doc.id,
            invoiceNo: doc.data().InvoiceNo,
            stockCode: doc.data().StockCode,
            description: doc.data().Description,
            quantity: doc.data().Quantity,
            invoiceDate: doc.data().InvoiceDate,
            unitPrice: doc.data().UnitPrice,
            customerID: doc.data().CustomerID,
            country: doc.data().Country
          }
          state.stocks.push(item)
        })
      )
      .catch(
        error => console.log(error)
      )
  },

  'SET_STOCKS' (state, item) {
    state.stocks = item
  },

  'DELETE_STOCK' (state, item) {
    if (confirm('Are you sure you want to delete this item?') === true) {
      firebase.db.collection('stocks').doc(item.id).delete()
        .then(function () {
          console.log('Document successfully deleted!')
        })
        .catch(function (error) {
          console.error('Error removing document: ', error)
        })
      let index = state.stocks.indexOf(item)
      state.stocks.splice(index, 1)
    }
  },

  'UPDATE_STOCKS' (state, {editedIndex, editedItem}) {
    console.log(editedItem)
    if (editedIndex > -1) {
      console.log(editedItem.invoiceNo)
      firebase.db.collection('stocks').doc(editedItem.id).update({
        InvoiceNo: editedItem.invoiceNo,
        StockCode: editedItem.stockCode,
        Description: editedItem.description,
        Quantity: editedItem.quantity,
        InvoiceDate: editedItem.invoiceDate,
        UnitPrice: editedItem.unitPrice,
        CustomerID: editedItem.customerID,
        Country: editedItem.country
      })
      .then(function () {
        console.log('Document successfully updated!')
        Object.assign(state.stocks[editedIndex], editedItem)
      })
      .catch(function (error) {
        console.error('Error updating document: ', error)
      })
    } else {
      firebase.db.collection('stocks').add({
        InvoiceNo: editedItem.invoiceNo,
        StockCode: editedItem.stockCode,
        Description: editedItem.description,
        Quantity: editedItem.quantity,
        InvoiceDate: editedItem.invoiceDate,
        UnitPrice: editedItem.unitPrice,
        CustomerID: editedItem.customerID,
        Country: editedItem.country
      })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)
        let newItem = {
          ...editedItem,
          id: docRef.id
        }
        state.stocks.push(newItem)
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
    }
  }
}

const actions = {
  initStocks: ({commit}) => {
    commit('INIT_STOCKS')
  },
  setStocks: ({commit}, item) => {
    commit('SET_STOCKS', item)
  },
  deleteStock: ({commit}, item) => {
    commit('DELETE_STOCK', item)
  },
  updateStocks: ({commit}, item) => {
    commit('UPDATE_STOCKS', item)
  }
}

const getters = {
  getStocks: state => {
    return state.stocks
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
