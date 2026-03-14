document.addEventListener("DOMContentLoaded", function () {
    generateCaptcha();
});

// Function to generate a random CAPTCHA
function generateCaptcha() {
    const captcha = Math.random().toString(36).substring(2, 8).toUpperCase(); // Random 6-character string
    document.getElementById("captchaCode").textContent = captcha;
}

// Function to validate CAPTCHA and sign out
function validateSignout() {
    const enteredCaptcha = document.getElementById("captchaInput").value.toUpperCase();
    const generatedCaptcha = document.getElementById("captchaCode").textContent;
    const errorMsg = document.getElementById("captchaError");

    if (enteredCaptcha === generatedCaptcha) {
        alert("Signout successful!");
        window.location.href = "index.html"; // Redirect to login page
    } else {
        errorMsg.textContent = "Incorrect CAPTCHA. Please try again.";
        generateCaptcha(); // Generate a new CAPTCHA
    }
}
