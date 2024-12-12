document.addEventListener("DOMContentLoaded", () => {
    showUser();
})

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html"
    }).catch("Erro ao fazer logout!");
}

function showUser() {
    const userDisplayLabel = document.getElementById("user");

    firebase.auth().onAuthStateChanged((user) =>{
        if(user) {
            const displayName = user.email;
            userDisplayLabel.textContent = `Conectado como: ${displayName}`;
        } else {
            userDisplayLabel.textContent = "Nenhum usuário conectado!";
        }
    })

}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        findTransactions(user);
    }
})

function findTransactions(user) {
    firebase.firestore()
    .collection('transactions')
    .where('user.uid','==', user.uid)
    .get()
    .then(snapshot => {
        const transactions = snapshot.docs.map(doc => doc.data());
        addTransactionsToScreen(transactions);
    })
}

function addTransactionsToScreen(transactions) {
    const orderedList = document.getElementById('transactions');
    transactions.forEach(transactions => {
        const li = document.createElement('li');
        li.classList.add(transactions.type);

        const date = document.createElement('p');
        date.innerHTML = formatDate(transactions.date);
        li.appendChild(date);

        const money = document.createElement('p');
        money.innerHTML = formatMoney(transactions.money);
        li.appendChild(money);

        const transactionType = document.createElement('p');
        transactionType.innerHTML = transactions.transactionType;
        li.appendChild(transactionType);

        if(transactions.description) {
            const description = document.createElement('p');
            description.innerHTML = transactions.description;
            li.appendChild(description);
        }
        
        orderedList.appendChild(li);

    });
}

function formatMoney(money) {
    return `${money.currency} ${money.value.toFixed(2)}`
}

function formatDate(date){
    return new Date(date).toLocaleDateString('pt');
}
