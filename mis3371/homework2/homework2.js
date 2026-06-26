function getValue(id) {
    var field = document.getElementById(id);
    return field ? field.value : "";
}

function getRadioValue(name) {
    var radios = document.getElementsByName(name);
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) return radios[i].value;
    }
    return "Not selected";
}

function reviewForm() {
    var output = "";

    output += "<p><b>Name:</b> " + getValue("firstName") + " " + getValue("middleInitial") + " " + getValue("lastName") + "</p>";
    output += "<p><b>Date of Birth:</b> " + getValue("dob") + "</p>";
    output += "<p><b>SSN:</b> " + getValue("ssn") + "</p>";
    output += "<p><b>Address:</b> " + getValue("address1") + " " + getValue("address2") + "</p>";
    output += "<p><b>City/State/Zip:</b> " + getValue("city") + ", " + getValue("state") + " " + getValue("zip") + "</p>";
    output += "<p><b>Email:</b> " + getValue("email") + "</p>";
    output += "<p><b>Symptoms:</b> " + getValue("symptoms") + "</p>";
    output += "<p><b>Gender:</b> " + getRadioValue("gender") + "</p>";
    output += "<p><b>Vaccinated:</b> " + getRadioValue("vaccinated") + "</p>";
    output += "<p><b>Insurance:</b> " + getRadioValue("insurance") + "</p>";
    output += "<p><b>User ID:</b> " + getValue("userId").toLowerCase() + "</p>";
    output += "<p><b>Password:</b> " + getValue("password") + "</p>";

    document.getElementById("reviewOutput").innerHTML = output;
}
