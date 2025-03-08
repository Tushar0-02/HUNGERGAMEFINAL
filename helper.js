import { db } from "./firebase.js";
import { collection, getDocs, updateDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Load available donations
async function loadDonations() {
    let container = document.getElementById("donationList");

    onSnapshot(collection(db, "donations"), (snapshot) => {
        container.innerHTML = "";

        snapshot.forEach((docSnap) => {
            let data = docSnap.data();
            let donationId = docSnap.id;

            if (data.status === "Pending") {
                let item = document.createElement("div");
                item.className = "donation-item";
                item.innerHTML = `
                    <strong>📞 Phone:</strong> ${data.phone} <br>
                    <strong>🍽 Food:</strong> ${data.foodType} <br>
                    <strong>📦 Quantity:</strong> ${data.quantity} <br>
                    <strong>📍 Place:</strong> ${data.place} <br>
                    <strong>⏰ Time:</strong> ${new Date(data.time).toLocaleString()} <br>
                    <button class="accept-btn" onclick="updateStatus('${donationId}', 'Accepted')">✅ Accept</button>
                    <button class="reject-btn" onclick="updateStatus('${donationId}', 'Rejected')">❌ Ignore</button>
                `;
                container.appendChild(item);
            }
        });
    });
}

// Update donation status
async function updateStatus(donationId, status) {
    const donationRef = doc(db, "donations", donationId);
    await updateDoc(donationRef, { status });

    // Remove from screen after accepting or ignoring
    loadDonations();
}

window.onload = loadDonations;
window.updateStatus = updateStatus;
