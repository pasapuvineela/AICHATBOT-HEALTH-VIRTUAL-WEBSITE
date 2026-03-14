document.addEventListener("DOMContentLoaded", function () {
    console.log("AI Virtual Health Assistant Loaded");

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

    /** 😊 Mood Tracker **/
    console.log("Mood Tracker Loaded");

    const moodButtons = document.querySelectorAll(".mood-btn");
    const moodSummary = document.getElementById("mood-summary");
    const historyList = document.getElementById("mood-history");
    const customMoodInput = document.getElementById("customMood");
    const customMoodBtn = document.getElementById("customMoodBtn");

    const moodResponses = {
        "Happy": "That's great! Keep spreading positivity! 🌞",
        "Sad": "It's okay to feel sad. Take some deep breaths and do something you love. 💙",
        "Stressed": "Try relaxation techniques like meditation or a short walk. 🌿",
        "Excited": "Awesome! Use this energy to accomplish something great! 🚀",
        "Tired": "Make sure to get enough rest and hydrate yourself. 💤"
    };

    function updateMood(mood) {
        moodSummary.innerText = moodResponses[mood] || `Processing AI suggestion for "${mood}"...`;
        if (!moodResponses[mood]) getMoodAdvice(mood);
        saveMood(mood);
    }

    moodButtons.forEach(button => {
        button.addEventListener("click", function () {
            updateMood(this.dataset.mood);
        });
    });

    if (customMoodBtn) {
        customMoodBtn.addEventListener("click", function () {
            const customMood = customMoodInput.value.trim();
            if (customMood) {
                updateMood(customMood);
                customMoodInput.value = "";
            }
        });
    }

    function saveMood(mood) {
        let previousMoods = JSON.parse(localStorage.getItem("moodHistory")) || [];
        previousMoods.push(mood);
        localStorage.setItem("moodHistory", JSON.stringify(previousMoods));
        displayMoodHistory();
    }

    function displayMoodHistory() {
        const previousMoods = JSON.parse(localStorage.getItem("moodHistory")) || [];
        historyList.innerHTML = previousMoods.map(mood => `<li>${mood}</li>`).join("");
    }

    async function getMoodAdvice(mood) {
        try {
            console.log(`Fetching AI advice for mood: ${mood}`);
            localStorage.setItem("userMood", mood); // Store mood in localStorage
    
            const apiKey = "AIzaSyBzUVFLtGJ182FrVvORgsgSBnzIc21TsVA"; 
            const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`;
    
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `Give me a self-care suggestion for someone feeling "${mood}".` }] }]
                })
            });
    
            if (!response.ok) throw new Error("Failed to fetch AI suggestion");

            const data = await response.json();
            const suggestion = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Stay positive and take care!";
            moodSummary.innerText = `AI Suggestion: ${suggestion}`;
        } catch (error) {
            console.error("AI Suggestion failed:", error);
            moodSummary.innerText = "AI Suggestion not available. Please try again later.";
        }
    }

    /** Load Mood History on Page Load **/
    displayMoodHistory();

    /** ⬅ Back Button Handling **/
    const backButton = document.getElementById("backButton");
    if (backButton) {
        backButton.addEventListener("click", function () {
            window.location.href = "dashboard.html";
        });
    }

    /** 🚪 Logout Functionality **/
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("isLoggedIn");
            alert("You have been logged out.");
            window.location.href = "../pages/login.html";
        });
    }
});
