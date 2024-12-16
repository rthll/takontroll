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

function saveTransaction() {
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