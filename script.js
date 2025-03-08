// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAqDVmtDc31ONWzORVTY6BZQBOOCFlrtNk",
    authDomain: "presenty-7a139.firebaseapp.com",
    projectId: "presenty-7a139",
    storageBucket: "presenty-7a139.appspot.com",
    messagingSenderId: "917953928211",
    appId: "1:917953928211:web:52de43f23522ab881c73e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login function
window.login = function(event) {
    event.preventDefault();  // Prevent form from reloading

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Clear previous error message
    errorMessage.innerText = "";

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful! Welcome " + userCredential.user.email);
            console.log("User:", userCredential.user);
            window.location.href = "main.html"; // Redirect to another page
        })
        .catch((error) => {
            console.error("Error Code:", error.code);
            console.error("Error Message:", error.message);

            // Display proper error message
            if (error.code === "auth/invalid-email") {
                errorMessage.innerText = "Invalid email format.";
            } else if (error.code === "auth/user-not-found") {
                errorMessage.innerText = "No user found with this email.";
            } else if (error.code === "auth/wrong-password") {
                errorMessage.innerText = "Incorrect password.";
            } else {
                errorMessage.innerText = "Login failed. Try again.";
            }
        });
};
