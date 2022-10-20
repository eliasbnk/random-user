import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDT3VdemygCbH8O7k-00B5KkB1V-UrZM9s',
  authDomain: 'random-user-95065.firebaseapp.com',
  projectId: 'random-user-95065',
  storageBucket: 'random-user-95065.appspot.com',
  messagingSenderId: '1096187537095',
  appId: '1:1096187537095:web:db6cf1a241547add2800e2',
};

export const app = firebase.initializeApp(firebaseConfig);
