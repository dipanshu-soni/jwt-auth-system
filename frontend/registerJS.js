const form = document.getElementById("registerForm");

form.addEventListener("submit", registerUser);

function registerUser(e)
{
    e.preventDefault(); // stops default form submission

    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const password = document.getElementById("passInput").value.trim();
    const age = Number(document.getElementById("ageInput").value.trim());

    if(!validateEmail(email))
    {
        alert("Invalid email format !");
        return;
    }

    if(password.length < 6)
    {
        alert("Password must be of at least 6 characters !");
        return;
    }

    if(age <= 0)
    {
        alert("Enter valid age !");
        return;
    }

    alert("Validation Passed !");

    fetch(`https://jwt-auth-system-vgt5.onrender.com/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            age: age
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);    // shows response from server
        console.log(data);
    })

    .catch (error => {
        console.log("Error : ", error);
    });
}

function validateEmail(email)
{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}