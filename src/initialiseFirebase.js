import { initializeApp } from 'firebase';

export default () => {
  initializeApp({
    apiKey: 'AIzaSyDjffGgEF_020YYP4h5TjG8SUyzxd7EVi8',
    authDomain: 'snake-heuristics.firebaseapp.com',
    databaseURL: 'https://snake-heuristics.firebaseio.com',
    projectId: 'snake-heuristics',
    storageBucket: 'snake-heuristics.appspot.com',
    messagingSenderId: '1049330516962',
  });
};
