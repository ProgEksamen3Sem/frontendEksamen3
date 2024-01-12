const HOTEL_BASE_URL = "http://localhost:8080/api/hotels/";
const HOTELS_URL = HOTEL_BASE_URL + "all";
const DELETE_HOTEL_URL = "http://localhost:8080/api/hotels/delete/";
const UPDATE_HOTEL_URL = "http://localhost:8080/api/hotels/update";



// Update the initHotels function to allow for custom URL
async function initHotels(url = HOTELS_URL) {
  await getAndRenderHotels(url);
}

async function getAndRenderHotels(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch hotels. Status: ${response.status}`);
    }

    const hotelsFromServer = await response.json();
    renderAllData(hotelsFromServer);
  } catch (err) {
    console.error("Error fetching hotels: " + err);
  }
}

// Rest of the code remains unchanged


function renderAllData(data) {
  const tableRowsArray = data.map((hotel) => `
    <tr>
      <td>${hotel.id}</td>
      <td>${hotel.name}</td>
      <td>${hotel.street}, ${hotel.city}</td>
    
      <td>
        <button data-hotel-id="${hotel.id}" type="button" class="btn btn-sm btn-secondary">Details</button>
        <button data-hotel-id="${hotel.id}" type="button" class="btn btn-sm btn-danger" onclick="deleteHotel(${hotel.id})">Delete</button>
        <button data-hotel-id="${hotel.id}" type="button" class="btn btn-sm btn-warning" onclick="showUpdateForm(${hotel.id})">Update</button>

      </td>
    </tr>`);
  const tableRowsString = tableRowsArray.join("\n");
  document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString);
  
}

async function deleteHotel(hotelId) {
  if (confirm("Are you sure you want to delete this hotel?")) {
    try {
      const response = await fetch(`${DELETE_HOTEL_URL}${hotelId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Reload hotels after deletion
        await initHotels();
        console.log("Hotel deleted successfully.");
      } else {
        console.error("Failed to delete hotel. Status:", response.status);
      }
    } catch (error) {
      console.error("Error during hotel deletion:", error);
    }
  }
}

function showHotelDetails(evt) {
  const target = evt.target;
  if (target.tagName === "BUTTON" && target.dataset.hotelId) {
    const id = target.dataset.hotelId;
    // Handle the hotel details, e.g., navigate to a new page or show details in the current page
    console.log("Show details for hotel with id:", id);
  }
}

function sanitizeStringWithTableRows(inputString) {
  // You can implement sanitization logic if needed
  return inputString;
}

// Call initHotels to fetch and render hotels when the page loads
initHotels();

document.addEventListener("DOMContentLoaded", function () {
  const createHotelButton = document.getElementById("btn-create-hotel");
  const createHotelForm = document.getElementById("create-hotel-form");
  const submitButton = document.getElementById("btn-submit");

  createHotelButton.addEventListener("click", function () {
    createHotelForm.style.display = "block";
  });

  submitButton.addEventListener("click", async function () {
    const hotelForm = document.getElementById("hotel-form")
    const formData = new FormData(hotelForm); // Updated form ID
    const newHotel = {};
    formData.forEach((value, key) => {
      newHotel[key] = value;
    });

    try {
      const response = await fetch("http://localhost:8080/api/hotels/create", { // Updated API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHotel),
      });

      if (response.ok) {
        const createdHotel = await response.json();
        // Optionally, you can update your UI or perform additional actions here
        console.log("Hotel created successfully:", createdHotel);
      } else {
        // Handle non-successful response (e.g., display an error message)
        console.error("Failed to create hotel. Status:", response.status);
      }
    } catch (error) {
      // Handle any network or unexpected errors
      console.error("Error during hotel creation:", error);
    }
  });
});

async function showUpdateForm(hotelId) {
  const hotelToUpdate = await getHotelDetails(hotelId);
  if (hotelToUpdate) {
    document.getElementById("update-id").value = hotelToUpdate.id;
    document.getElementById("update-name").value = hotelToUpdate.name;
    document.getElementById("update-street").value = hotelToUpdate.street;
    document.getElementById("update-city").value = hotelToUpdate.city;
    document.getElementById("update-zip").value = hotelToUpdate.zip;
    document.getElementById("update-country").value = hotelToUpdate.country;

    document.getElementById("update-hotel-form").style.display = "block";
  }
}

async function getHotelDetails(hotelId) {
  try {
    const response = await fetch(`${HOTEL_BASE_URL}${hotelId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch hotel details. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching hotel details: " + error);
    return null;
  }
}

document.getElementById("btn-update").addEventListener("click", async function () {
  const updateForm = document.getElementById("update-form");
  const formData = new FormData(updateForm);
  const updatedHotel = {};
  formData.forEach((value, key) => {
    updatedHotel[key] = value;
  });

  try {
    const response = await fetch(UPDATE_HOTEL_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedHotel),
    });

    if (response.ok) {
      // Reload hotels after update
      await initHotels();
      console.log("Hotel updated successfully.");
      // Hide the update form
      document.getElementById("update-hotel-form").style.display = "none";
    } else {
      console.error("Failed to update hotel. Status:", response.status);
    }
  } catch (error) {
    console.error("Error during hotel update:", error);
  }
});



