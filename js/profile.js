document.addEventListener("DOMContentLoaded", function () {
    const profileDisplay = document.getElementById("profile-display");
    const profileForm = document.getElementById("profile-form");
    const editProfileBtn = document.getElementById("editProfileBtn");
    const saveProfileBtn = document.getElementById("saveProfileBtn");
    const cancelEditBtn = document.getElementById("cancelEditBtn");

    // Fields
    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");
    const genderInput = document.getElementById("gender");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const altPhoneInput = document.getElementById("altPhone");
    const addressInput = document.getElementById("address");

    // Display Fields
    const displayName = document.getElementById("display-name");
    const displayAge = document.getElementById("display-age");
    const displayGender = document.getElementById("display-gender");
    const displayEmail = document.getElementById("display-email");
    const displayPhone = document.getElementById("display-phone");
    const displayAltPhone = document.getElementById("display-alt-phone");
    const displayAddress = document.getElementById("display-address");

    // Load saved data from local storage
    function loadProfile() {
        const profileData = JSON.parse(localStorage.getItem("userProfile")) || {};
        displayName.textContent = profileData.name || "Not set";
        displayAge.textContent = profileData.age || "Not set";
        displayGender.textContent = profileData.gender || "Not set";
        displayEmail.textContent = profileData.email || "Not set";
        displayPhone.textContent = profileData.phone || "Not set";
        displayAltPhone.textContent = profileData.altPhone || "Not set";
        displayAddress.textContent = profileData.address || "Not set";

        // Fill form fields with existing data
        nameInput.value = profileData.name || "";
        ageInput.value = profileData.age || "";
        genderInput.value = profileData.gender || "Male";
        emailInput.value = profileData.email || "";
        phoneInput.value = profileData.phone || "";
        altPhoneInput.value = profileData.altPhone || "";
        addressInput.value = profileData.address || "";
    }

    // Edit Profile
    editProfileBtn.addEventListener("click", function () {
        profileDisplay.style.display = "none";
        profileForm.style.display = "block";
    });

    // Save Profile
    saveProfileBtn.addEventListener("click", function () {
        const profileData = {
            name: nameInput.value,
            age: ageInput.value,
            gender: genderInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            altPhone: altPhoneInput.value,
            address: addressInput.value
        };

        localStorage.setItem("userProfile", JSON.stringify(profileData));
        loadProfile();
        profileForm.style.display = "none";
        profileDisplay.style.display = "block";
    });

    // Cancel Editing
    cancelEditBtn.addEventListener("click", function () {
        profileForm.style.display = "none";
        profileDisplay.style.display = "block";
    });

    loadProfile();
});
