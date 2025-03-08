import { db } from "./firebase.js";
import { collection, getDocs, onSnapshot, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Load user activity data
async function loadUserActivity() {
    let userTable = document.getElementById("userActivityList");
    
    onSnapshot(collection(db, "users"), (snapshot) => {
        userTable.innerHTML = "";
        snapshot.forEach((docSnap) => {
            let data = docSnap.data();
            let userId = docSnap.id;
            let statusClass = data.online ? "status-online" : "status-offline";

            let row = `
                <tr>
                    <td>${data.name || "Unknown"}</td>
                    <td>${data.email || "N/A"}</td>
                    <td>${new Date(data.lastUpload).toLocaleString() || "Never"}</td>
                    <td class="${statusClass}">${data.online ? "Online" : "Offline"}</td>
                    <td>
                        <button class="block-btn" onclick="blockUser('${userId}')">🚫 Block</button>
                    </td>
                </tr>
            `;
            userTable.innerHTML += row;
        });
    });
}

// Load all donations
async function loadDonations() {
    let donationTable = document.getElementById("donationList");

    onSnapshot(collection(db, "donations"), (snapshot) => {
        donationTable.innerHTML = "";
        snapshot.forEach((docSnap) => {
            let data = docSnap.data();
            
            let row = `
                <tr>
                    <td>${data.user || "Anonymous"}</td>
                    <td>${data.foodType}</td>
                    <td>${data.quantity}</td>
                    <td>${data.place}</td>
                    <td>${new Date(data.time).toLocaleString()}</td>
                </tr>
            `;
            donationTable.innerHTML += row;
        });
    });
}

// Block user function
async function blockUser(userId) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { blocked: true });
    alert("User has been blocked.");
}

// Run functions when page loads
window.onload = () => {
    loadUserActivity();
    loadDonations();
};
window.blockUser = blockUser;
