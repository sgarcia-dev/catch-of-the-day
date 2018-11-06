import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDQYhzeu5f3VaAp2tFZjZxmXUGtaxZE81g",
  authDomain: "catch-of-the-day-sgarcia.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-sgarcia.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp, base };
