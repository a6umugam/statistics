import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyBN_MEf0ayjj8rP5RwWZbZ961wP8Eh2GlM",
  authDomain: "statistics-f7499.firebaseapp.com",
  projectId: "statistics-f7499",
  storageBucket: "statistics-f7499.appspot.com",
  messagingSenderId: "744423283727",
  appId: "1:744423283727:web:2c860f9fd2a6e23ae3577a"
};

firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
// const auth = firebase.auth();

// export { auth, db };

createApp(App)
  .use(router)
  .mount('#app')