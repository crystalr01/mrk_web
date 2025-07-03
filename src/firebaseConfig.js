// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD7EqMUFLJXvUVGUr-MlEJMrjSqxdDUnOU",
    authDomain: "scroller-4d10f.firebaseapp.com",
    databaseURL: "https://scroller-4d10f-default-rtdb.firebaseio.com",
    projectId: "scroller-4d10f",
    storageBucket: "scroller-4d10f.appspot.com",
    messagingSenderId: "1053362115345",
    appId: "1:1053362115345:web:cb5a53b442de56d55a32b0",
    measurementId: "G-FPJWNK47JY"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push, set };
