// loadData.js automatically runs as the page is loaded.

let currentExpense = {};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnAddExpense').addEventListener('click', addExpense);
    document.getElementById('btnSaveExpense').addEventListener('click', saveExpense);
    document.getElementById('btnDeleteExpense').addEventListener('click', deleteExpense);
// loading data from localstorage
    myContacts = loadData('contacts');
    myProperties = loadData('properties');
    myGoods = loadData('goods');
    myExpenses = loadData('expenses');
// adding up overall totals
    getTotalExpenses();
// creating options and lists
    createOptionsContacts();
    createExpensesList();
});

function getTotalExpenses(){
    let myTotal = 0;
    for (i = 0; i < myExpenses.length; i++){
        myTotal += parseInt(myExpenses[i].amount);
    }
    myTotal = formatCurrency(myTotal);
    document.getElementById('totalExpenses').innerHTML = myTotal;
}

function createOptionsContacts(){
    for (i = 0; i < myContacts.length; i++){
        let newOption = createNewOption(i)    
        document.getElementById('expensePayableTo').appendChild(newOption);
        
        let newOption2 = createNewOption(i)
        document.getElementById('expensePayableTo2').appendChild(newOption2);
    }
}

function createNewOption(i){
    let newOption = document.createElement('option');
    newOption.id = "option" + i.toString();
    let contactName = myContacts[i].name;
    newOption.appendChild(document.createTextNode(contactName));
    return newOption;
}

function createExpensesList(){
    sortArray(myExpenses);
    // create one form per array entry
    // populate it from each entry as well
    for (i = 0; i < myExpenses.length; i++) {
        // clone form and give it an Id
        let formClone = document.getElementById('expensesDisplayItem').cloneNode(true)
        let expenseFormId = 'expensesDisplay' + i.toString();
        formClone.id = expenseFormId;
        // update its fields according to its Id
        formClone.children[0].expenseName.value = myExpenses[i].name;
        formClone.children[0].expensePayableTo.value = myExpenses[i].payableTo;
        formClone.children[0].expenseAmount.value = myExpenses[i].amount;
        formClone.children[0].expenseDate.value = myExpenses[i].date;
        formClone.children[0].expenseNotes.value = myExpenses[i].notes;
        formClone.children[0].children[13].addEventListener('click', saveExpense);
        formClone.children[0].children[14].addEventListener('click', deleteExpense);
        formClone.style.display = "block";
        // append it to the ul
        document.getElementById('expensesDisplayList').appendChild(formClone);
    }   
}

function addExpense(){
    event.preventDefault();
    currentExpense = {
        name: this.parentNode.expenseName.value,
        payableTo: this.parentNode.expensePayableTo2.value,
        amount: this.parentNode.expenseAmount.value,
        date: this.parentNode.expenseDate.value,
        notes: this.parentNode.expenseNotes.value,
    }
    myExpenses.push(currentExpense);
    console.log(currentExpense);
    alert("New Expense Added: " + currentExpense.name + ".");
    updateExpenses();
   
    deleteDisplayList(-1);
    createExpensesList(myExpenses);
}

function updateExpenses(){
    expensesJSONString = JSON.stringify(myExpenses);
    localStorage.setItem("expenses", expensesJSONString);
}

function getExpenseId(element){
    let expenseFormId = element.parentNode.parentNode.id;
    let myExpenseId = parseInt(expenseFormId.substring(15));
    return myExpenseId;
}

function saveExpense(){
    event.preventDefault();
    let myExpenseId = getExpenseId(this);
    // search myGoods and overwrite entry with same name with entry's stuff.
    myExpenses[myExpenseId].name = this.parentNode.expenseName.value;
    myExpenses[myExpenseId].payableTo = this.parentNode.expensePayableTo.value;
    myExpenses[myExpenseId].amount = this.parentNode.expenseAmount.value;
    myExpenses[myExpenseId].date = this.parentNode.expenseDate.value;
    myExpenses[myExpenseId].notes = this.parentNode.expenseNotes.value;

    // update localStorage version
    updateExpenses();
    getTotalExpenses();
    
    sortDisplay();
}

function sortDisplay(){
    deleteDisplayList(0);
    createExpensesList(myExpenses);
}

function deleteExpense(){
    event.preventDefault();
    let myExpenseId = getExpenseId(this);
    // search myGoods for this node's name and remove that key/value pair
    myExpenses.splice(myExpenseId, 1);

    // update localStorage
    updateExpenses();

    // recreate goods list
    deleteDisplayList(1);
    createExpensesList(myExpenses);
}

// 'adjustment' is to allow you to delete more or fewer items than currently exists within the object.
function deleteDisplayList(adjustment){
    let objLength = myExpenses.length + adjustment;
    for (i = 0; i < objLength; i++){
        document.getElementById('expensesDisplay' + i.toString()).remove();
    }
}

function sortArray(array){
    array.sort((a,b) => {
        if (a.payableTo > b.payableTo){
            return 1;
        }
        else if (a.payableTo == b.payableTo){
            if (a.date >= b.date){
                if (a.date == b.date){
                    if (a.name == b.name){
                        if (a.value >= b.value){
                            return -1;
                        }
                        else{
                            return 1;
                        }
                    }
                    else if (a.name > b.name){
                        return 1;
                    }
                    else{
                        return -1;
                    }
                }
                return 1;
            }
            else{
                if (a.name > b.name){
                    return 1;
                }
                else{
                    return -1;
                }
            }
        }
        else{
            return -1;
        }
    })
}