function validateEmail(email) {
    // Expressão regular corrigida
    return /\S+@\S+\.\S+/.test(email);
}

function isPasswordValid() {
    const password = form.password().value;
    return password.length < 6; // Exemplo de validação simples: senha deve ter no mínimo 6 caracteres
}
