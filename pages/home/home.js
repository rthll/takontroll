document.addEventListener("DOMContentLoaded", () => {
    showUser();
})

function showUser() {
    const userDisplayLabel = document.getElementById("user");

    firebase.auth().onAuthStateChanged(user =>{
        if(user) {
            const displayName = user.email;
            userDisplayLabel.textContent = `Conectado como: ${displayName}`;
        } else {
            userDisplayLabel.textContent = "Erro!";
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
    .orderBy('date', 'desc')
    .get()
    .then(snapshot => {
        const transactions = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
    }));
        addTransactionsToScreen(transactions);
        updateCounter(transactions);
    })
    .catch(err => {
        console.log(err);
        alert('Erro ao recuperar transações!');
    })
}

function updateCounter(transactions) {
    const exchangeRates = {
        Dolar: 6.2,  
        Euro: 7.0,   
        Real: 1.0    
    };

    const total = transactions.reduce((total, transaction) => {
        const value = transaction.money.value;
        const currency = transaction.money.currency;

        const valueInBRL = value * (exchangeRates[currency] || 1);

        if (transaction.type === 'income') {
            return total + valueInBRL;
        } else if (transaction.type === 'expense') {
            return total - valueInBRL;
        }
        return total;
    }, 0);

    const counterLabel = document.querySelector('.counter label');
    counterLabel.textContent = `Saldo Total: R$ ${total.toFixed(2)}`;
}



function deleteDocument(uid) {
    showLoading();
    const db = firebase.firestore();
    db.collection("transactions").doc(uid).delete()
        .then(() => {
            hideLoading();
            alert("Documento excluído com sucesso!");
            location.reload(); 
        })
        .catch((error) => {
            hideLoading();
            console.error("Erro ao remover documento: ", error);
            alert("Erro ao remover documento!");
        });
}


function addTransactionsToScreen(transactions) {
    const orderedList = document.getElementById('transactions');
    transactions.forEach(transactions => {
        const li = document.createElement('li');
        li.classList.add(transactions.type);
        li.addEventListener('click', () => {
            window.location.href = "../transaction/transaction.html?uid=" + transactions.uid;
        })

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
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); 
            deleteDocument(transactions.uid);
        });
        
        li.appendChild(deleteButton);

        orderedList.appendChild(li);
    });
}

function newTransaction() {
    window.location.href = "../transaction/transaction.html";
}

function formatMoney(money) {
    return `${money.currency} ${money.value.toFixed(2)}`
}

function formatDate(date){
    return new Date(date).toLocaleDateString('pt');
}
