import firebase from 'firebase'
import firestore from 'firebase/firestore'

let firebaseConfig = {
    apiKey: process.env.VUE_APP_FB_API,
    authDomain: process.env.VUE_APP_FB_DOMAIN,
    databaseURL: process.env.VUE_APP_FB_URL,
    projectId: process.env.VUE_APP_FB_PROJECT,
    storageBucket: process.env.VUE_APP_FB_BUCKET,
    messagingSenderId: process.env.VUE_APP_FB_SENDER_ID,
    appId: process.env.VUE_APP_FB_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

export default db;