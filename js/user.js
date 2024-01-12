const USERS_URL = "http://localhost:8080/api/guests/create";

async function createUser() {
    const userForm = document.getElementById("user-form");
    const formData = new FormData(userForm);

    const userData = {};
    formData.forEach((value, key) => {
        userData[key] = value;
    });

    try {
        const response = await fetch(USERS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const createdUser = await response.json();
            console.log("User created successfully:", createdUser);
            // Optionally, you can update your UI or perform additional actions here
            alert("User created successfully!");
        } else {
            console.error("Failed to create user. Status:", response.status);
            // Handle non-successful response (e.g., display an error message)
            alert("Failed to create user. Please check the form and try again.");
        }
    } catch (error) {
        console.error("Error during user creation:", error);
        // Handle any network or unexpected errors
        alert("Error during user creation. Please try again later.");
    }
}
