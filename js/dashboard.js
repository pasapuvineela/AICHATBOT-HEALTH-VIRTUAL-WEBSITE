document.addEventListener("DOMContentLoaded", function () {
    console.log("Dashboard Loaded");

    /** 🏠 Navigation Menu Toggle **/
    const menuButton = document.getElementById("menuButton");
    const menuDropdown = document.getElementById("menuDropdown");

    menuButton.addEventListener("click", function () {
        menuDropdown.classList.toggle("show");
    });

    // Close menu when clicking outside
    window.addEventListener("click", function (event) {
        if (!event.target.matches("#menuButton")) {
            if (menuDropdown.classList.contains("show")) {
                menuDropdown.classList.remove("show");
            }
        }
    });

    /** 🌙 Dark Mode Toggle **/
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    function applyDarkModePreference() {
        const isDarkMode = localStorage.getItem("darkMode") === "enabled";
        body.classList.toggle("dark-mode", isDarkMode);
        if (darkModeToggle) darkModeToggle.innerText = isDarkMode ? "☀ Light Mode" : "🌙 Dark Mode";
    }

    applyDarkModePreference(); // Apply stored preference

    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function () {
            const isDarkMode = body.classList.toggle("dark-mode");
            localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
            darkModeToggle.innerText = isDarkMode ? "☀ Light Mode" : "🌙 Dark Mode";
        });
    }
    /** 📝 Fetch and Display Quote of the Day **/
    async function fetchQuote() {
        try {
            const response = await fetch("https://api.quotable.io/random");
            if (!response.ok) throw new Error("Failed to fetch quote");

            const data = await response.json();
            document.getElementById("quote").innerText = `"${data.content}"`;
            document.getElementById("quote-explanation").innerText = `— ${data.author}`;
        } catch (error) {
            console.error("Error fetching quote:", error);
            document.getElementById("quote").innerText = "Stay positive and take care!";
            document.getElementById("quote-explanation").innerText = "— AI Health Assistant";
        }
    }

    fetchQuote(); // Load quote on page load
});
