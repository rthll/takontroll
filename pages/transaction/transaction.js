if (!isNewTransaction()) {
    const uid = getTransactionUid();
    findTransactionByUid(uid);
}

function findTransactionByUid(uid) {

    firebase.firestore()
    .collection("transactions")
        .doc(uid)
        .get()
        .then(doc => {
            if (doc.exists) {
                fillTransactionScreen(doc.data());
            } else {
                alert("Documento não encontrado!");
                window.location.href = "../home/home.html";
            }
        })
        .catch(() => {
            alert("Erro ao recuperar o documento!");
            window.location.href = "../home/home.html";
        })
    
}

function save(transaction) {
    firebase.firestore()
    .collection('transactions')
    .add(transaction)
    .then(() => {
        window.location.href = "../home/home.html";

    })
    .catch(() =>{
        alert("Erro ao salvar transação");
    })
}

function fillTransactionScreen(transaction) {
    if(transaction.type == "expense") {
        form.expense().checked = true;
    } else {
        form.income().checked = true;
    }

    form.date().value = transaction.date;
    form.currency().value = transaction.money.currency;
    form.value().value = transaction.money.value;
    form.transactionType().value = transaction.transactionType;

    if(transaction.description) {
        form.description().value = transaction.description;
    }
}

function cancelTransaction() {
    window.location.href = "../home/home.html";
}

function validDate(){
    const date = document.getElementById('date').value;
    form.dateError().style.display = !date ? "block" : "none";
}

function validValue() {
    const value = document.getElementById('value').value;
    if((value == 0) || (value < 0)) {
         form.valueError().style.display = "block";
    } else {
        form.valueError().style.display = "none";
    }
}

function validTransactionType() {
    const transactionType = document.getElementById('transactionType').value;

    if(!transactionType) {
        form.transactionTypeError().style.display = "block";
    } else {
        form.transactionTypeError().style.display = "none";
    }
}

function createTransaction() {
    let typeExpense = "income";
    if(form.expense().checked){
        typeExpense = "expense";
    }

    const transaction = {
        type: typeExpense,
        date: form.date().value,
        money: {
            currency: form.currency().value,
            value: parseFloat(form.value().value)
        },
        transactionType: form.transactionType().value,
        description: form.description().value,
        user: {
            uid: firebase.auth().currentUser.uid
        }
    }

    return transaction;
}

function update (transaction) {
    firebase.firestore()
    .collection("transactions")
    .doc(getTransactionUid())
    .update(transaction)
    .then(() => {
        window.location.href = "../home/home.html";
    })
    .catch(() => {
        alert("Erro ao atualizar transação!");
    });
}

function saveTransaction() {
    
    const transaction = createTransaction();

    if (isNewTransaction()) {
        save(transaction);
    } else {
        update(transaction);
    }

}

getTransactionUid();

function getTransactionUid() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid');
}  

function isNewTransaction() {
    return getTransactionUid() ? false : true;
}


const form = {
    transactionType: () => document.getElementById("transactionType"),
    date: () => document.getElementById('date'),
    income: () => document.getElementById('income'),
    expense: () => document.getElementById('expense'),
    dateError: () => document.getElementById('date-error'),
    currency: () => document.getElementById('currency'),
    value: () => document.getElementById("value"),
    valueError: () => document.getElementById('value-error'),
    transactionTypeError: () => document.getElementById('transaction-type-error'),
    description: () => document.getElementById('description'),
}