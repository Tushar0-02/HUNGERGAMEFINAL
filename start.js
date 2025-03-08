import { saveToFirestore } from "./firebase.js";

function addDonation() {
    let foodType = document.getElementById("foodType").value.trim();
    let quantity = document.getElementById("quantity").value.trim();
    let place = document.getElementById("place").value.trim();
    let time = document.getElementById("time").value;

    if (!foodType || !quantity || !place || !time) {
        alert("❌ Please fill in all fields before adding a donation.");
        return;
    }

    let list = document.getElementById("donationList");
    let item = document.createElement("div");
    item.className = "donation-item";
    item.innerHTML = `
        <div>
            <strong>Food:</strong> ${foodType} <br>
            <strong>Quantity:</strong> ${quantity} <br>
            <strong>Place:</strong> ${place} <br>
            <strong>Time:</strong> ${new Date(time).toLocaleString()}
        </div>
        <button class='btn remove-btn' onclick='removeItem(this)'>Remove</button>
    `;
    list.appendChild(item);

    saveToFirestore(foodType, quantity, place, time);

    // ✅ Clear input fields after adding
    document.getElementById("foodType").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("place").value = "";
    document.getElementById("time").value = "";
}

function removeItem(button) {
    button.parentElement.remove();
}

function submitDonations() {
    let list = document.getElementById("donationList");
    if (list.children.length > 0) {
        document.getElementById("popup").style.display = "block";
        list.innerHTML = "";
    }
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

window.addDonation = addDonation;
window.submitDonations = submitDonations;
window.closePopup = closePopup;
window.removeItem = removeItem;
