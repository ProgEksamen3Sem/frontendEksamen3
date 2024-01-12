function getHotels() {
    var selectedType = document.getElementById("hotelType").value;
    
    // You can make an AJAX request to your backend to retrieve hotels based on the selected type
    // Replace the following line with your actual endpoint URL and AJAX logic
    var endpointUrl = "http://localhost:8080/api/hotels/byType/" + encodeURIComponent(selectedType);


    // Example using fetch API
    fetch(endpointUrl)
        .then(response => response.json())
        .then(data => displayHotels(data))
        .catch(error => console.error('Error:', error));
}

function displayHotels(hotels) {
    var hotelListContainer = document.getElementById("hotelList");
    hotelListContainer.innerHTML = "<h3>Hotels:</h3>";

    if (hotels.length === 0) {
        hotelListContainer.innerHTML += "<p>No hotels found for the selected type.</p>";
    } else {
        hotels.forEach(function (hotel) {
            hotelListContainer.innerHTML += "<p>Name: " + hotel.name + ", Type: " + hotel.type + "</p>";
        });
    }
}
