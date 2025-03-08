import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAqDVmtDc31ONWzORVTY6BZQBOOCFlrtNk",
    authDomain: "presenty-7a139.firebaseapp.com",
    projectId: "presenty-7a139",
    storageBucket: "presenty-7a139.appspot.com",
    messagingSenderId: "917953928211",
    appId: "1:917953928211:web:52de43f23522ab881c73e6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
