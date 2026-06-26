window.onload = function () {
    document.getElementById("todayDate").innerHTML =
        new Date().toDateString();

    showRating();
};

function showRating() {
    var slider = document.getElementById("healthRating");
    var output = document.getElementById("ratingValue");

    if (slider && output) {
        output.innerHTML = slider.value;
    }
}

function getValue(id) {
    var field = document.getElementById(id);
    return field ? field.value : "";
}

function getRadioValue(name) {
    var radios = document.getElementsByName(name);

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }

    return "Not Selected";
}

function reviewForm() {

    var output = "";

    output += "<p><b>Name:</b> " +
        getValue("firstName") + " " +
        getValue("middleInitial") + " " +
        getValue("lastName") + "</p>";

    output += "<p><b>Date of Birth:</b> " +
        getValue("dob") + "</p>";

    output += "<p><b>SSN:</b> " +
        getValue("ssn") + "</p>";

    output += "<p><b>Address:</b> " +
        getValue("address1") + " " +
        getValue("address2") + "</p>";

    output += "<p><b>City:</b> " +
        getValue("city") + "</p>";

    output += "<p><b>State:</b> " +
        getValue("state") + "</p>";

    output += "<p><b>Zip:</b> " +
        getValue("zip") + "</p>";

    output += "<p><b>Email:</b> " +
        getValue("email") + "</p>";

    output += "<p><b>Symptoms:</b> " +
        getValue("symptoms") + "</p>";

    output += "<p><b>Gender:</b> " +
        getRadioValue("gender") + "</p>";

    output += "<p><b>Vaccinated:</b> " +
        getRadioValue("vaccinated") + "</p>";

    output += "<p><b>Insurance:</b> " +
        getRadioValue("insurance") + "</p>";

    output += "<p><b>User ID:</b> " +
        getValue("userId") + "</p>";

    document.getElementById("reviewOutput").innerHTML = output;
}
