const RESERVATIONS_URL = "http://localhost:8080/api/reservations/create";

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
            // Optionally, you can update your UI or perform additional actions here
            alert("Reservation created successfully!");
        } else {
            console.error("Failed to create reservation. Status:", response.status);
            // Handle non-successful response (e.g., display an error message)
            alert("Failed to create reservation. Please check the form and try again.");
        }
    } catch (error) {
        console.error("Error during reservation creation:", error);
        // Handle any network or unexpected errors
        alert("Error during reservation creation. Please try again later.");
    }
}
