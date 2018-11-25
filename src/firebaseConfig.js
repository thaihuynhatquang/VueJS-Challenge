const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')

let config = {
  apiKey: 'AIzaSyAq3FQdzSLUoWXD16rTG52RqqYTYzGMPxs',
  authDomain: 'case-study-teko.firebaseapp.com',
  databaseURL: 'https://case-study-teko.firebaseio.com',
  projectId: 'case-study-teko',
  storageBucket: 'case-study-teko.appspot.com',
  messagingSenderId: '611535883029'
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
