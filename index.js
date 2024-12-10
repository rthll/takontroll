firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        window.location.href = "pages/home/home.html";
    }
})

function onChangeEmail() {
    toggleButtonsDisabled();
    toggleEmailErrors();
}

function onChangePassword() {
    togglePasswordErrors();
}

function isEmailValid() {
    const email = form.email().value;
    return email && validateEmail(email);
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

}

function togglePasswordErrors() {
    const password = isPasswordValid();
    form.passwordRequiredError().style.display = isPasswordValid(password) ? "block" : "none";
}

function toggleButtonsDisabled() {
    const emailValid = isEmailValid();
    const passwordValid = isPasswordValid();

    form.loginButton().disabled = !emailValid || !passwordValid;
    form.recoverPasswordButton().disabled = !emailValid;
}

function login() {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(response => {
        hideLoading();
        window.location.href = "pages/home/home.html";
    }).catch(err => {
        hideLoading();
        alert(getErrorMessage(err));
    })
}

function getErrorMessage(err) {
    if(err){
        return "Credenciais inválidas!";
    }
}

function register() {
    //window.location.href = "pages/register/register.html";
    showLoading();

}

function recoverPassword() {
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading();
        alert("Se o email estiver cadastrado você receberá informações para recuperação de senha!");
    }).catch(err => {
        hideLoading();
        alert(getErrorMessage(err));
    });

}

const form = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    loginButton: () => document.getElementById('login-button'),
    recoverPasswordButton: () => document.getElementById('recover-password-button'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error')

}