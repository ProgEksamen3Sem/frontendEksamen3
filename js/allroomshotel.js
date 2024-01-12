function getRooms() {
    var hotelId = document.getElementById("hotelIdInput").value;

    // Check if hotelId is not empty
    if (!hotelId) {
        console.error('Hotel ID is empty');
        return;
    }

    // Make a GET request to your backend endpoint
    fetch(`http://localhost:8080/api/rooms/byHotel/${hotelId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayRooms(data))
        .catch(error => handleErrors(error));
}

// Example function to display rooms
function displayRooms(rooms) {
    var roomListElement = document.getElementById("roomList");
    roomListElement.innerHTML = ''; // Clear previous results

    rooms.forEach(room => {
        var li = document.createElement("li");
        li.textContent = `Room ID: ${room.id}, Room Number: ${room.roomNumber}, Beds: ${room.numberOfBeds}, Price: ${room.pricePerNight}`;
        roomListElement.appendChild(li);
    });
}

// Function to handle errors
function handleErrors(error) {
    console.error('Server Error:', error.message);
    // You can add more error handling logic as needed
}