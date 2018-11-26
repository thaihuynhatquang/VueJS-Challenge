const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')

let config = {
  apiKey: 'AIzaSyB_wUmTzixWr3TjrqtYULOTi0-4uGiiNlg',
  authDomain: 'master-chart.firebaseapp.com',
  databaseURL: 'https://master-chart.firebaseio.com',
  projectId: 'master-chart',
  storageBucket: 'master-chart.appspot.com',
  messagingSenderId: '692104320733'
}

firebase.initializeApp(config)

const db = firebase.firestore()

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
}

db.settings(settings)

export {
    db
}
