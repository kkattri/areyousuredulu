// Function to handle validation and redirection
function validateAndRedirect() {
    // Get inputs
    const nameInput = document.getElementById('name').value.trim().toLowerCase(); // Normalize name
    const passwordInput = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Reset error message
    errorMessage.textContent = '';

    // Validate name
    if (nameInput !== 'duylan') {
        errorMessage.textContent = 'This is not for you. Please leave this page.';
        errorMessage.style.color = 'red';
        return; // Stop further execution
    }

    // Validate password
    if (passwordInput === '1505') {
        sessionStorage.setItem('access', '1505');
        window.location.href = 'timeline.html';
    } else if (passwordInput === '1596') {
        sessionStorage.setItem('access', '1596');
        window.location.href = 'memories.html';
    } else {
        errorMessage.textContent = 'Incorrect code. Try again.';
        errorMessage.style.color = 'red';
    }
}

// Add click event listener to the button
document.getElementById('unlock').addEventListener('click', validateAndRedirect);

// Add keyboard "Enter" key listener
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { // Check if the "Enter" key was pressed
        validateAndRedirect();
    }
});