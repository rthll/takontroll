firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        window.location.href = "../home/home.html";
    }
})

function onChangeEmail() {
    toggleRegisterButtonDisabled()
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function onChangePassword() {
    toggleRegisterButtonDisabled()
    const password = form.password().value;
    form.passwordMinimumError().style.display = isPasswordValid(password) ? "block" : "none";
}

function onChangeConfirmPassword() {
    toggleRegisterButtonDisabled()
    const confirmPassword = form.confirmPassword().value;
    const password = form.password().value;

    if (!isPasswordValid(password) && password == confirmPassword) {
        form.passwordDoesntMatchError().style.display = "none";
    } else {
        form.passwordDoesntMatchError().style.display = "block";
    }
}

function toggleRegisterButtonDisabled() {
    form.registerButton().disabled = !isFormValid();
}

function isFormValid() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;
    const email = form.email().value;

    if(!password || !email){
        return false;
    }

    if(password != confirmPassword) {
        return false;
    }

    return true;
}

function register() {
    const email = form.email().value;
    const password = form.password().value;

    showLoading();
    firebase.auth().createUserWithEmailAndPassword(
        email,
        password
    ).then(() => {
        hideLoading();
        window.location.href = "../home/home.html";
    }).catch( err => {
        hideLoading();
        alert("Não foi possível cadastrar!");
    })

    
}

const form = {
    email: () => document.getElementById('email'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    password: () => document.getElementById('password'),
    passwordMinimumError: () => document.getElementById('password-minimum-error'),
    confirmPassword: () => document.getElementById('confirmPassword'),
    passwordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    registerButton: () => document.getElementById('register-button')
}
