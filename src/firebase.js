import firebase from 'firebase'
const firebaseConfig = {
      apiKey: "AIzaSyDZQN0Lwp75qb3SJnCcjzCem1TDMMgBR7A",
      authDomain: "whatsup-9c8e9.firebaseapp.com",
      projectId: "whatsup-9c8e9",
      storageBucket: "whatsup-9c8e9.appspot.com",
      messagingSenderId: "873019312502",
      appId: "1:873019312502:web:e796f45ac9f98e79e0d257",
      measurementId: "G-3DJPJKM8Y0"
    };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()


export {auth,provider} ;
export default db;