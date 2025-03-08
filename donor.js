import { db } from "./firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Function to add a donation
async function addDonation() {
    let foodType = document.getElementById("foodType").value.trim();
    let quantity = document.getElementById("quantity").value.trim();
    let place = document.getElementById("place").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let timeInput = document.getElementById("time").value.trim();
    let time = timeInput ? new Date(timeInput).toISOString() : null;

    if (!foodType || !quantity || !place || !phone || !timeInput) {
        alert("❌ Please fill in all fields before adding a donation.");
        return;
    }

    try {
        await addDoc(collection(db, "donations"), {
            foodType,
            quantity: Number(quantity),
            place,
            phone,
            time,
            status: "Pending"
        });

        alert("✅ Donation added successfully!");
        loadDonations();
    } catch (error) {
        console.error("Error adding donation:", error);
    }
}

// Function to load donations
async function loadDonations() {
    let container = document.getElementById("donationList");
    container.innerHTML = "";

    onSnapshot(collection(db, "donations"), (snapshot) => {
        container.innerHTML = "";
        snapshot.forEach((docSnap) => {
            let data = docSnap.data();
            let donationId = docSnap.id;

            let item = document.createElement("div");
            item.className = "donation-item";
            item.innerHTML = `
                <strong>📞 Phone:</strong> ${data.phone} <br>
                <strong>🍽 Food:</strong> ${data.foodType} <br>
                <strong>📦 Quantity:</strong> ${data.quantity} <br>
                <strong>📍 Place:</strong> ${data.place} <br>
                <strong>⏰ Time:</strong> ${new Date(data.time).toLocaleString()} <br>
                <strong>📢 Status:</strong> ${data.status} <br>
                <button onclick="deleteDonation('${donationId}')">🗑 Delete</button>
            `;
            container.appendChild(item);
        });
    });
}

// Function to delete a donation
async function deleteDonation(donationId) {
    await deleteDoc(doc(db, "donations", donationId));
    alert("✅ Donation deleted.");
}

// Load donations on page load
window.onload = loadDonations;
window.addDonation = addDonation;
window.deleteDonation = deleteDonation;
