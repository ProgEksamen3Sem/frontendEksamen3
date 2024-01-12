function searchRoom() {
    var roomId = document.getElementById("roomIdInput").value;

    // Check if roomId is not empty
    if (!roomId) {
        alert('Room ID is empty');
        return;
    }

    // Make a GET request to retrieve room details
    fetch(`http://localhost:8080/api/rooms/${roomId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(room => displayRoomDetails(room))
        .catch(error => {
            alert('Room not found');
            console.error('Error:', error);
        });
}

function displayRoomDetails(room) {
    var roomDetailsElement = document.getElementById("roomDetails");
    roomDetailsElement.innerHTML = '';

    var div = document.createElement("div");
    div.innerHTML = `
        <h3>Room Details:</h3>
        <p>Room ID: ${room.id}</p>
        <p>Room Number: ${room.roomNumber}</p>
        <p>Number of Beds: ${room.numberOfBeds}</p>
        <p>Price per Night: ${room.pricePerNight}</p>
    `;

    roomDetailsElement.appendChild(div);
}
