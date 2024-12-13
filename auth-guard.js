firebase.auth().onAuthStateChanged((user) => {
    if(!user) {
        window.location.href = "../../index.html";
    }
})

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html"
    }).catch("Erro ao fazer logout!");
}