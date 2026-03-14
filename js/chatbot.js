// chatbot.js
const API_KEY = "AIzaSyBzUVFLtGJ182FrVvORgsgSBnzIc21TsVA"; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

document.addEventListener("DOMContentLoaded", function () {
    console.log("Chatbot Loaded");

    function appendMessage(sender, message) {
        const chatBox = document.getElementById("chatBox");
        if (!chatBox) {
            console.error("Error: chatBox element not found!");
            return;
        }

        const messageElement = document.createElement("div");
        messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");
        messageElement.innerText = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    async function sendMessage(userInput) {
        appendMessage("user", userInput);
    
        // Clear the input box after sending the message
        document.getElementById("userInput").value = "";
    
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ role: "user", parts: [{ text: userInput }] }]
                })
            });
    
            const data = await response.json();
            if (data?.candidates?.length > 0) {
                let botResponse = data.candidates[0].content.parts[0].text;
                let trimmedResponse = botResponse.split(" ").slice(0, 80).join(" "); // Limit response length
                appendMessage("bot", trimmedResponse);
            } else {
                appendMessage("bot", "I’m sorry, I couldn't find an answer.");
            }
        } catch (error) {
            console.error("Error:", error);
            appendMessage("bot", "There was an issue connecting to AI.");
        }
    }
    

    document.getElementById("sendButton").addEventListener("click", function () {
        const userInput = document.getElementById("userInput").value.trim();
        if (userInput) sendMessage(userInput);
    });

    document.getElementById("userInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const userInput = event.target.value.trim();
            if (userInput) sendMessage(userInput);
        }
    });

    document.getElementById("voiceButton").addEventListener("click", function () {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = function (event) {
            const voiceInput = event.results[0][0].transcript;
            document.getElementById("userInput").value = voiceInput;
            sendMessage(voiceInput);
        };
    });
});
