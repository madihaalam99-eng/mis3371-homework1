window.onload = function () {
    document.getElementById("todayDate").textContent =
        new Date().toDateString();

    showRating();
    hideSubmitButton();
};

function getField(id) {
    return document.getElementById(id);
}

function getValue(id) {
    const field = getField(id);
    return field ? field.value.trim() : "";
}

function showError(fieldId, errorId, message) {
    const field = getField(fieldId);
    const error = getField(errorId);

    if (field) {
        field.classList.remove("valid-field");
        field.classList.add("invalid-field");
    }

    if (error) {
        error.textContent = message;
    }

    hideSubmitButton();
    return false;
}

function showValid(fieldId, errorId) {
    const field = getField(fieldId);
    const error = getField(errorId);

    if (field) {
        field.classList.remove("invalid-field");
        field.classList.add("valid-field");
    }

    if (error) {
        error.textContent = "";
    }

    hideSubmitButton();
    return true;
}

function clearOptionalField(fieldId, errorId) {
    const field = getField(fieldId);
    const error = getField(errorId);

    if (field) {
        field.classList.remove("invalid-field", "valid-field");
    }

    if (error) {
        error.textContent = "";
    }

    return true;
}

function hideSubmitButton() {
    const submitButton = getField("submitButton");

    if (submitButton) {
        submitButton.hidden = true;
    }
}

function showRating() {
    const slider = getField("healthRating");
    const output = getField("ratingValue");

    if (slider && output) {
        output.textContent = slider.value;
    }
}

function validateFirstName() {
    const value = getValue("firstName");
    const pattern = /^[A-Za-z'-]{1,30}$/;

    if (value === "") {
        return showError(
            "firstName",
            "firstNameError",
            "First name is required."
        );
    }

    if (!pattern.test(value)) {
        return showError(
            "firstName",
            "firstNameError",
            "Use 1–30 letters, apostrophes, or dashes only."
        );
    }

    return showValid("firstName", "firstNameError");
}

function validateMiddleInitial() {
    const value = getValue("middleInitial");

    if (value === "") {
        return clearOptionalField(
            "middleInitial",
            "middleInitialError"
        );
    }

    if (!/^[A-Za-z]$/.test(value)) {
        return showError(
            "middleInitial",
            "middleInitialError",
            "Enter one letter only."
        );
    }

    getField("middleInitial").value = value.toUpperCase();
    return showValid("middleInitial", "middleInitialError");
}

function validateLastName() {
    const value = getValue("lastName");
    const pattern = /^[A-Za-z'-]{1,30}$/;

    if (value === "") {
        return showError(
            "lastName",
            "lastNameError",
            "Last name is required."
        );
    }

    if (!pattern.test(value)) {
        return showError(
            "lastName",
            "lastNameError",
            "Use 1–30 letters, apostrophes, or dashes only."
        );
    }

    return showValid("lastName", "lastNameError");
}

function formatDOB() {
    const field = getField("dob");

    if (!field) {
        return;
    }

    let digits = field.value.replace(/\D/g, "").slice(0, 8);

    if (digits.length > 4) {
        digits =
            digits.slice(0, 2) +
            "/" +
            digits.slice(2, 4) +
            "/" +
            digits.slice(4);
    } else if (digits.length > 2) {
        digits =
            digits.slice(0, 2) +
            "/" +
            digits.slice(2);
    }

    field.value = digits;
}

function validateDOB() {
    const value = getValue("dob");
    const pattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = value.match(pattern);

    if (value === "") {
        return showError(
            "dob",
            "dobError",
            "Date of birth is required."
        );
    }

    if (!match) {
        return showError(
            "dob",
            "dobError",
            "Use the format MM/DD/YYYY."
        );
    }

    const month = Number(match[1]);
    const day = Number(match[2]);
    const year = Number(match[3]);

    const enteredDate = new Date(year, month - 1, day);
    const today = new Date();

    const oldestDate = new Date(
        today.getFullYear() - 120,
        today.getMonth(),
        today.getDate()
    );

    const dateIsReal =
        enteredDate.getFullYear() === year &&
        enteredDate.getMonth() === month - 1 &&
        enteredDate.getDate() === day;

    if (!dateIsReal) {
        return showError(
            "dob",
            "dobError",
            "Enter a valid calendar date."
        );
    }

    if (enteredDate > today) {
        return showError(
            "dob",
            "dobError",
            "Date of birth cannot be in the future."
        );
    }

    if (enteredDate < oldestDate) {
        return showError(
            "dob",
            "dobError",
            "Date of birth cannot be more than 120 years ago."
        );
    }

    return showValid("dob", "dobError");
}

function formatSSN() {
    const field = getField("ssn");

    if (!field) {
        return;
    }

    let digits = field.value.replace(/\D/g, "").slice(0, 9);

    if (digits.length > 5) {
        digits =
            digits.slice(0, 3) +
            "-" +
            digits.slice(3, 5) +
            "-" +
            digits.slice(5);
    } else if (digits.length > 3) {
        digits =
            digits.slice(0, 3) +
            "-" +
            digits.slice(3);
    }

    field.value = digits;
}

function validateSSN() {
    const value = getValue("ssn");

    if (value === "") {
        return showError(
            "ssn",
            "ssnError",
            "SSN or ID number is required."
        );
    }

    if (!/^\d{3}-\d{2}-\d{4}$/.test(value)) {
        return showError(
            "ssn",
            "ssnError",
            "Enter exactly 9 digits."
        );
    }

    return showValid("ssn", "ssnError");
}

function validateAddress1() {
    const value = getValue("address1");

    if (value === "") {
        return showError(
            "address1",
            "address1Error",
            "Address line 1 is required."
        );
    }

    if (value.length < 2 || value.length > 30) {
        return showError(
            "address1",
            "address1Error",
            "Address must contain 2–30 characters."
        );
    }

    return showValid("address1", "address1Error");
}

function validateAddress2() {
    const value = getValue("address2");

    if (value === "") {
        return clearOptionalField(
            "address2",
            "address2Error"
        );
    }

    if (value.length < 2 || value.length > 30) {
        return showError(
            "address2",
            "address2Error",
            "If entered, address line 2 must contain 2–30 characters."
        );
    }

    return showValid("address2", "address2Error");
}

function validateCity() {
    const value = getValue("city");
    const pattern = /^[A-Za-z .'-]{2,30}$/;

    if (value === "") {
        return showError(
            "city",
            "cityError",
            "City is required."
        );
    }

    if (!pattern.test(value)) {
        return showError(
            "city",
            "cityError",
            "Use 2–30 letters, spaces, apostrophes, periods, or dashes."
        );
    }

    return showValid("city", "cityError");
}

function validateState() {
    const value = getValue("state");

    if (value === "") {
        return showError(
            "state",
            "stateError",
            "Select a state, DC, or PR."
        );
    }

    return showValid("state", "stateError");
}

function validateZip() {
    const field = getField("zip");

    if (!field) {
        return false;
    }

    field.value = field.value.replace(/\D/g, "").slice(0, 5);
    const value = field.value;

    if (value === "") {
        return showError(
            "zip",
            "zipError",
            "ZIP code is required."
        );
    }

    if (!/^\d{5}$/.test(value)) {
        return showError(
            "zip",
            "zipError",
            "Enter exactly 5 digits."
        );
    }

    return showValid("zip", "zipError");
}

function forceLowercaseEmail() {
    const field = getField("email");

    if (field) {
        field.value = field.value.toLowerCase();
    }
}

function validateEmail() {
    const value = getValue("email");
    const pattern =
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (value === "") {
        return showError(
            "email",
            "emailError",
            "Email address is required."
        );
    }

    if (!pattern.test(value)) {
        return showError(
            "email",
            "emailError",
            "Enter an email like name@domain.com."
        );
    }

    return showValid("email", "emailError");
}

function validateSymptoms() {
    const value = getValue("symptoms");

    if (value === "") {
        return clearOptionalField(
            "symptoms",
            "symptomsError"
        );
    }

    if (/[<>]/.test(value)) {
        return showError(
            "symptoms",
            "symptomsError",
            "Do not enter HTML tags or angle brackets."
        );
    }

    if (value.length > 500) {
        return showError(
            "symptoms",
            "symptomsError",
            "Symptoms must be 500 characters or fewer."
        );
    }

    return showValid("symptoms", "symptomsError");
}

function validateGender() {
    const selected =
        document.querySelector('input[name="gender"]:checked');

    const error = getField("genderError");

    if (!selected) {
        if (error) {
            error.textContent = "Select a gender option.";
        }

        hideSubmitButton();
        return false;
    }

    if (error) {
        error.textContent = "";
    }

    hideSubmitButton();
    return true;
}

function validateVaccinated() {
    const selected =
        document.querySelector('input[name="vaccinated"]:checked');

    const error = getField("vaccinatedError");

    if (!selected) {
        if (error) {
            error.textContent =
                "Select Yes, No, or Unsure.";
        }

        hideSubmitButton();
        return false;
    }

    if (error) {
        error.textContent = "";
    }

    hideSubmitButton();
    return true;
}

function validateUserId() {
    const field = getField("userId");

    if (!field) {
        return false;
    }

    field.value = field.value.toLowerCase();
    const value = field.value.trim();
    const pattern = /^[a-z][a-z0-9_-]{4,19}$/;

    if (value === "") {
        return showError(
            "userId",
            "userIdError",
            "User ID is required."
        );
    }

    if (value.length < 5 || value.length > 20) {
        return showError(
            "userId",
            "userIdError",
            "User ID must contain 5–20 characters."
        );
    }

    if (/^\d/.test(value)) {
        return showError(
            "userId",
            "userIdError",
            "User ID cannot begin with a number."
        );
    }

    if (!pattern.test(value)) {
        return showError(
            "userId",
            "userIdError",
            "Use letters, numbers, dashes, and underscores only."
        );
    }

    return showValid("userId", "userIdError");
}

function validatePassword() {
    const password = getValue("password");
    const userId = getValue("userId").toLowerCase();

    if (password === "") {
        return showError(
            "password",
            "passwordError",
            "Password is required."
        );
    }

    if (password.length < 8) {
        return showError(
            "password",
            "passwordError",
            "Password must contain at least 8 characters."
        );
    }

    if (!/[A-Z]/.test(password)) {
        return showError(
            "password",
            "passwordError",
            "Password must contain an uppercase letter."
        );
    }

    if (!/[a-z]/.test(password)) {
        return showError(
            "password",
            "passwordError",
            "Password must contain a lowercase letter."
        );
    }

    if (!/\d/.test(password)) {
        return showError(
            "password",
            "passwordError",
            "Password must contain a number."
        );
    }

    if (password.toLowerCase() === userId && userId !== "") {
        return showError(
            "password",
            "passwordError",
            "Password cannot equal the User ID."
        );
    }

    return showValid("password", "passwordError");
}

function validateConfirmPassword() {
    const confirmPassword = getValue("confirmPassword");
    const password = getValue("password");

    if (confirmPassword === "") {
        return showError(
            "confirmPassword",
            "confirmPasswordError",
            "Re-enter the password."
        );
    }

    if (confirmPassword !== password) {
        return showError(
            "confirmPassword",
            "confirmPasswordError",
            "Passwords do not match."
        );
    }

    return showValid(
        "confirmPassword",
        "confirmPasswordError"
    );
}

function getRadioValue(name) {
    const selected =
        document.querySelector(
            'input[name="' + name + '"]:checked'
        );

    return selected ? selected.value : "Not selected";
}

function getCheckedMedicalHistory() {
    const checked =
        document.querySelectorAll(
            'input[name="medicalHistory"]:checked'
        );

    const values = [];

    checked.forEach(function (box) {
        values.push(box.value);
    });

    return values.length > 0
        ? values.join(", ")
        : "None selected";
}

function validateForm() {
    const checks = [
        validateFirstName(),
        validateMiddleInitial(),
        validateLastName(),
        validateDOB(),
        validateSSN(),
        validateAddress1(),
        validateAddress2(),
        validateCity(),
        validateState(),
        validateZip(),
        validateEmail(),
        validateSymptoms(),
        validateGender(),
        validateVaccinated(),
        validateUserId(),
        validatePassword(),
        validateConfirmPassword()
    ];

    const allValid = checks.every(function (result) {
        return result === true;
    });

    const status = getField("formStatus");
    const submitButton = getField("submitButton");

    if (allValid) {
        if (status) {
            status.textContent =
                "All information is valid. You may now submit the form.";

            status.className = "success-message";
        }

        if (submitButton) {
            submitButton.hidden = false;
        }

        return true;
    }

    if (status) {
        status.textContent =
            "Please correct the errors shown on the form.";

        status.className = "status-error";
    }

    if (submitButton) {
        submitButton.hidden = true;
    }

    const firstError =
        document.querySelector(".invalid-field");

    if (firstError) {
        firstError.focus();
    }

    return false;
}

function reviewForm() {
    const output = [];

    output.push(
        "<table>" +
        "<tr><td><strong>Name</strong></td><td>" +
        escapeHTML(getValue("firstName")) +
        " " +
        escapeHTML(getValue("middleInitial")) +
        " " +
        escapeHTML(getValue("lastName")) +
        "</td></tr>"
    );

    output.push(
        "<tr><td><strong>Date of Birth</strong></td><td>" +
        escapeHTML(getValue("dob")) +
        "</td></tr>"
    );

    output.push(
        "<tr><td><strong>SSN/ID</strong></td><td>" +
        maskSSN(getValue("ssn")) +
        "</td></tr>"
    );

    output.push(
        "<tr><td><strong>Address</strong></td><td>" +
        escapeHTML(getValue("address1")) +
        "<br>" +
        escapeHTML(getValue("address2")) +
        "<br>" +
        escapeHTML(getValue("city")) +
        ", " +
        escapeHTML(getValue("state")) +
        " " +
        escapeHTML(getValue("zip")) +
        "</td></tr>"
    );

    output.push(
        "<tr><td><strong>Email</strong></td><td>" +
        escapeHTML(getValue("email")) +
        "</td></tr>"
    );

    output.push(
        "<tr><td><strong>Symptoms</strong></td><td>" +
        escapeHTML(getValue("symptoms")) +
        "</td></tr>"
    );

    output.push(
        "<tr><td><strong>Gender</strong></td><td>" +
        escapeHTML(getRadioValue("gender")) +
        "</td></tr>"
    );

    output.push(
        "<tr><td><strong>Vaccinated</strong></td><td>" +
        escapeHTML(getRadioValue("vaccinated")) +
        "</td></tr>"
    );

    output.push(
        "<tr><td><strong>Medical History</strong></td><td>" +
        escapeHTML(getCheckedMedicalHistory()) +
        "</td></tr>"
    );

    output.push(
        "<tr><td><strong>Health Rating</strong></td><td>" +
        escapeHTML(getValue("healthRating")) +
        " out of 10</td></tr>"
    );

    output.push(
        "<tr><td><strong>User ID</strong></td><td>" +
        escapeHTML(getValue("userId").toLowerCase()) +
        "</td></tr></table>"
    );

    const reviewOutput = getField("reviewOutput");

    if (reviewOutput) {
        reviewOutput.innerHTML = output.join("");
    }
}

function maskSSN(value) {
    const digits = value.replace(/\D/g, "");

    if (digits.length !== 9) {
        return "Not completed";
    }

    return "***-**-" + digits.slice(-4);
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function resetFormMessages() {
    window.setTimeout(function () {
        document
            .querySelectorAll(".error-message")
            .forEach(function (message) {
                message.textContent = "";
            });

        document
            .querySelectorAll(".valid-field, .invalid-field")
            .forEach(function (field) {
                field.classList.remove(
                    "valid-field",
                    "invalid-field"
                );
            });

        const status = getField("formStatus");
        const reviewOutput = getField("reviewOutput");
        const submitButton = getField("submitButton");

        if (status) {
            status.textContent = "";
            status.className = "";
        }

        if (reviewOutput) {
            reviewOutput.innerHTML = "";
        }

        if (submitButton) {
            submitButton.hidden = true;
        }

        showRating();
    }, 0);
}

document.addEventListener("DOMContentLoaded", function () {
    const form = getField("patientForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            if (!validateForm()) {
                event.preventDefault();
            }
        });
    }
});
