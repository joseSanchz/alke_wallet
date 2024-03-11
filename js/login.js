const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById("btnLogin");
const spam = document.getElementById("error");
const email = 'milan10@gmail.com'
const password = 'italia'

loginButton.addEventListener('click', function() {

    if (emailInput.value == email && passwordInput.value == password) {
        document.form.submit()
    } else {
        spam.innerHTML="Usuario Incorrecto";
        spam.style.color= "red"
    }
});



