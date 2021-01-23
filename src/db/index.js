import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase
  .initializeApp({
    apiKey: "AIzaSyCIorBdiksgsTyuRYxPF8l39CvXOcDBZPQ",
    authDomain: "servicario-85ce3.firebaseapp.com",
    databaseURL: "https://servicario-85ce3-default-rtdb.firebaseio.com",
    projectId: "servicario-85ce3",
    storageBucket: "servicario-85ce3.appspot.com",
    messagingSenderId: "73145317052",
    appId: "1:73145317052:web:02f2146496016c6d4602b9"
  })
  .firestore()


export default db

export const { Timestamp } = firebase.firestore

