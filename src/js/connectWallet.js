 // Handle form submission
 document.getElementById('wallet-connect').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);

    // Convert form data to JSON
    const userData = {};
    formData.forEach((value, key) => {
        userData[key] = value;
    });
    const jsonData = JSON.stringify(userData);

    // Send registration data to server
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        });
        if (response.ok) {
            console.log('User registered successfully!');
            alert('User registered successfully!');
        } else {
            console.error('Failed to register user:', response.statusText);
            alert('Failed to register user. Please try again.');
        }
    } catch (error) {
        console.error('Error registering user:', error);
        alert('Error registering user. Please try again.');
    }
});