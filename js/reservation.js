const RESERVATIONS_URL = "http://localhost:8080/api/reservations/create";
const DELETE_RESERVATION_URL = "http://localhost:8080/api/reservations/delete/";

document.addEventListener("DOMContentLoaded", function () {
    loadReservations(); // Load reservations when the page loads
});

async function createReservation() {
    const reservationForm = document.getElementById("reservation-form");
    const formData = new FormData(reservationForm);

    const reservationData = {};
    formData.forEach((value, key) => {
        reservationData[key] = value;
    });

    try {
        const response = await fetch(RESERVATIONS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reservationData),
        });

        if (response.ok) {
            const createdReservation = await response.json();
            console.log("Reservation created successfully:", createdReservation);
           
            alert("Reservation created successfully!");
            loadReservations(); // Refresh the reservation list
        } else {
            console.error("Failed to create reservation. Status:", response.status);
            // Handle non-successful response (e.g., display an error message)
            alert("Failed to create reservation. Please check the form and try again.");
        }
    } catch (error) {
        console.error("Error during reservation creation:", error);
       
    }
}



function deleteReservationConfirmation(reservationId) {
    // Show the confirmation modal
    const confirmationModal = new bootstrap.Modal(document.getElementById('delete-confirmation-modal'));
    confirmationModal.show();

    // Handle delete button click inside the modal
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    confirmDeleteBtn.addEventListener('click', async () => {
        confirmationModal.hide();
        await deleteReservation(reservationId);
    });
}
async function deleteReservation() {
    const reservationIdToDelete = document.getElementById("reservationIdToDelete").value;

    if (!reservationIdToDelete) {
        alert("Please enter a reservation ID.");
        return;
    }

    try {
        const response = await fetch(`${DELETE_RESERVATION_URL}${reservationIdToDelete}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert("Reservation deleted successfully.");
            loadReservations(); // Refresh the reservation list
        } else {
            console.error("Failed to delete reservation. Status:", response.status);
            alert("Failed to delete reservation. Please try again.");
        }
    } catch (error) {
        console.error("Error during reservation deletion:", error);
      
    }
}
