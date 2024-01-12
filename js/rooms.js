const ROOMS_URL = "http://localhost:8080/api/rooms/create";

document.addEventListener("DOMContentLoaded", async function () {
    await loadHotelOptions();
});

async function loadHotelOptions() {
    const hotelsDropdown = document.getElementById("hotelId");
    try {
        const response = await fetch("http://localhost:8080/api/hotels/all");
        if (!response.ok) {
            throw new Error(`Failed to fetch hotels. Status: ${response.status}`);
        }
        const hotels = await response.json();
        hotels.forEach((hotel) => {
            const option = document.createElement("option");
            option.value = hotel.id;
            option.textContent = hotel.name;
            hotelsDropdown.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching hotels:", error);
    }
}

async function createRoom() {
    const roomForm = document.getElementById("room-form");
    const formData = new FormData(roomForm);

    const roomData = {};
    formData.forEach((value, key) => {
        roomData[key] = value;
    });

    try {
        const response = await fetch(ROOMS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(roomData),
        });

        if (response.ok) {
            const createdRoom = await response.json();
            console.log("Room created successfully:", createdRoom);

            // Show a simple browser alert as a popup
            alert("Room created successfully!");

        } else {
            console.error("Failed to create room. Status:", response.status);
            // Handle non-successful response (e.g., display an error message)
        }
    } catch (error) {
        console.error("Error during room creation:", error);
        // Handle any network or unexpected errors
    }
}
