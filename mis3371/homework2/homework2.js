function showRating() {
    var rating = document.getElementById("healthRating").value;
    document.getElementById("ratingValue").innerHTML = rating;
}

function getRadioValue(name) {
    var radios = document.getElementsByName(name);

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }

    return "Not selected";
}

function getCheckboxValue(id) {
    var box = document.getElementById(id);

    if (box && box.checked) {
        return "Y";
    } else {
        return "N";
    }
}

function reviewForm() {
    var firstName = document.getElementById("firstName").value;
    var middleInitial = document.getElementById("middleInitial").value;
    var lastName = document.getElementById("lastName").value;
    var dob = document.getElementById("dob").value;
    var ssn = document.getElementById("ssn").value;
    var address1 = document.getElementById("address1").value;
    var address2 = document.getElementById("address2").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zip").value;
    var email = document.getElementById("email").value;
    var symptoms = document.getElementById("symptoms").value;
    var userId = document.getElementById("userId").value.toLowerCase();
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (zip.length > 5) {
        zip = zip.substring(0, 5);
    }

    document.getElementById("userId").value = userId;

    var passwordMessage = "pass";
    if (password !== confirmPassword) {
        passwordMessage = "ERROR: Passwords do not match";
    }

    var reviewHTML = "";
    reviewHTML += "<table>";
    reviewHTML += "<tr><td>First, MI, Last Name</td><td>" + firstName + " " + middleInitial + " " + lastName + "</td><td>pass</td></tr>";
    reviewHTML += "<tr><td>Date of Birth</td><td>" + dob + "</td><td>pass</td></tr>";
    reviewHTML += "<tr><td>ID/SSN</td><td>" + ssn + "</td><td>pass</td></tr>";
    reviewHTML += "<tr><td>Email Address</td><td>" + email + "</td><td>pass</td></tr>";
    reviewHTML += "<tr><td>Address</td><td>" + address1 + "<br>" + address2 + "<br>" + city + ", " + state + " " + zip + "</td><td>pass</td></tr>";
    reviewHTML += "<tr><td>Gender</td><td>" + getRadioValue("gender") + "</td><td>pass</td></tr>";
    reviewHTML += "<tr><td>Vaccinated?</td><td>" + getRadioValue("vaccinated") + "</td><td>pass</td></tr>";
    reviewHTML += "<tr><td>Insurance?</td><td>" + getRadioValue("insurance") + "</td><td>pass</td></tr>";
    reviewHTML += "<tr><td>Diabetes</td><td>" + getCheckboxValue("diabetes") + "</td></tr>";
    reviewHTML += "<tr><td>Asthma</td><td>" + getCheckboxValue("asthma") + "</td></tr>";
    reviewHTML += "<tr><td>Heart Disease</td><td>" + getCheckboxValue("heartDisease") + "</td></tr>";
    reviewHTML += "<tr><td>Health Rating</td><td>" + document.getElementById("healthRating").value + "</td></tr>";
    reviewHTML += "<tr><td>Described Symptoms</td><td>" + symptoms + "</td></tr>";
    reviewHTML += "<tr><td>User ID</td><td>" + userId + "</td></tr>";
    reviewHTML += "<tr><td>Password</td><td>" + password + "</td><td>" + passwordMessage + "</td></tr>";
    reviewHTML += "</table>";

    document.getElementById("reviewOutput").innerHTML = reviewHTML;
}
