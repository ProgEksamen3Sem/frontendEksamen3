const HOTEL_DETAILS_URL = "http://localhost:8080/api/hotels/";

document.getElementById("btn-search").addEventListener("click", searchHotelById);

async function searchHotelById() {
  const hotelId = document.getElementById("search-bar").value.trim();

  if (!hotelId) {
    alert("Please enter a valid Hotel ID");
    return;
  }

  try {
    const detailsUrl = `${HOTEL_DETAILS_URL}${hotelId}`;
    const response = await fetch(detailsUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch hotel details. Status: ${response.status}`);
    }

    const hotelDetails = await response.json();
    displayHotelDetails(hotelDetails);
  } catch (err) {
    console.error("Error fetching hotel details: " + err);
    alert("Error fetching hotel details. Please check the Hotel ID and try again.");
  }
}

function displayHotelDetails(hotelDetails) {
  const hotelIdElement = document.getElementById("hotel-id");
  const hotelNameElement = document.getElementById("hotel-name");
  const hotelAddressElement = document.getElementById("hotel-address");

  hotelIdElement.textContent = `ID: ${hotelDetails.id}`;
  hotelNameElement.textContent = `Name: ${hotelDetails.name}`;
  hotelAddressElement.textContent = `Address: ${hotelDetails.street}, ${hotelDetails.city}`;

  // You can customize this function to display details as needed
}

  