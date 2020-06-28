document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('tasksTab').addEventListener('click', toggleTasks);
    document.getElementById('contactsTab').addEventListener('click', toggleContacts);
    document.getElementById('propertiesTab').addEventListener('click', toggleProperties);
    document.getElementById('goodsTab').addEventListener('click', toggleGoods);
    document.getElementById('expensesTab').addEventListener('click', toggleExpenses);
    document.getElementById('printTab').addEventListener('click', stopPrintTab);
// loaddata from LocalStorage
    myTasks = loadData('tasks');
    myContacts = loadData('contacts');
    myProperties = loadData('properties');
    myGoods = loadData('goods');
    myExpenses = loadData('expenses');
// create lists
    formatTasks();
    formatContacts();
    formatProperties();
    formattedGoods();
    formatExpenses();
});
let element;
let myButton;

function toggleTasks(){
    event.preventDefault();
    element = document.getElementById('formatTasksContainer');
    myButton = document.getElementById('tasksTab');
    toggleList(element, myButton);
}

function toggleContacts(){
    event.preventDefault();
    element = document.getElementById('formatContactsContainer');
    myButton = document.getElementById('contactsTab');
    toggleList(element, myButton);
}
function toggleProperties(){
    event.preventDefault();
    element = document.getElementById('formatPropertiesContainer');
    myButton = document.getElementById('propertiesTab');
    toggleList(element, myButton);
}
function toggleGoods(){
    event.preventDefault();
    element = document.getElementById('formatGoodsContainer');
    myButton = document.getElementById('goodsTab');
    toggleList(element, myButton);
}
function toggleExpenses(){
    event.preventDefault();
    element = document.getElementById('formatExpensesContainer');
    myButton = document.getElementById('expensesTab');
    toggleList(element, myButton);
}

function toggleList(element, myButton){
    if (element.style.display != "block"){
        element.style.display = "block";
        if (myButton != null || myButton != undefined){
            myButton.classList.add("activeBtn");
        }
    }
    else {
        element.style.display = "none";
        if (myButton != null || myButton != undefined){
            myButton.classList.remove("activeBtn");
        }
    }
}

function formatTasks(){
    if (myTasks.length > 0) {
        for (i = 0; i < myTasks.length; i++) {
        // clone form and give it an Id
            let formClone = document.getElementById('formattedTaskItem').cloneNode(true)
            let taskFormId = 'formattedTasks' + i.toString();
            formClone.id = taskFormId;
        // update its fields according to its Id
            formClone.children[0].children[0].innerHTML = myTasks[i].name;
            formClone.children[1].children[1].innerHTML = myTasks[i].status;
            if (myTasks[i].date == ""){
                formClone.children[1].children[3].innerHTML = "N/A";
            }
            else{
                let formattedDate = getDate(myTasks[i].date)
                formClone.children[1].children[3].innerHTML = formattedDate;
            }
        // append it to the ul
            formClone.style.display = "block";
            formClone.classList.remove('hiddenLi');
            document.getElementById('formattedTaskList').appendChild(formClone);
        };
    }
}

function formatContacts() {
    for (i = 0; i < myContacts.length; i++) {
        // clone form and give it an Id
        let formClone = document.getElementById('formattedContactItem').cloneNode(true)
        let contactFormId = 'formattedContact' + i.toString();
        formClone.id = contactFormId;
    // update its fields according to its Id
        formClone.children[0].children[1].innerHTML = myContacts[i].name;
        formClone.children[1].children[1].innerHTML = myContacts[i].role;
        formClone.children[2].children[1].innerHTML = myContacts[i].phone;
        formClone.children[3].children[1].innerHTML = myContacts[i].email;
        formClone.children[4].children[1].innerHTML = myContacts[i].address;
        formClone.children[5].children[1].innerHTML = myContacts[i].notes;
        formClone.style.display = "block";
        formClone.classList.remove('hiddenLi');
    // append it to the ul
        document.getElementById('formattedContactList').appendChild(formClone);
    }
}

function formatProperties() {
    for (i = 0; i < myProperties.length; i++) {
        // clone form and give it an Id
            let formClone = document.getElementById('formattedPropertiesItem').cloneNode(true)
            let propertyFormId = 'formattedProperties' + i.toString();
            formClone.id = propertyFormId;

        // update its fields according to its Id
            formClone.children[0].children[1].innerHTML = myProperties[i].name;
            if (myProperties[i].buyer == undefined || myProperties[i].buyer == "selectContact"){
                formClone.children[1].children[1].innerHTML = "N/A";
            }
            else{
                formClone.children[1].children[1].innerHTML = myProperties[i].buyer;
            }
            if (myProperties[i].value == ""){
                formClone.children[2].children[1].innerHTML = "N/A";
            }
            else{
                formClone.children[2].children[1].innerHTML = formatCurrency(myProperties[i].value);
            }
            if (myProperties[i].offer == ""){
                formClone.children[2].children[3].innerHTML = "N/A";
            }
            else{
                formClone.children[2].children[3].innerHTML = formatCurrency(myProperties[i].offer);
            }
            formClone.children[3].children[1].innerHTML = myProperties[i].status;
            if (myProperties[i].date == ""){
                formClone.children[3].children[3].innerHTML = "N/A";
            }
            else{
                let formattedDate = getDate(myProperties[i].date)
                formClone.children[3].children[3].innerHTML = formattedDate;
            }
            formClone.children[4].children[1].innerHTML = myProperties[i].address;
            formClone.children[5].children[1].innerHTML = myProperties[i].notes;
        // append it to the ul
            formClone.style.display = "block";
            formClone.classList.remove('hiddenLi');
            document.getElementById('formattedPropertiesList').appendChild(formClone);
    };
}

function formattedGoods() {
    for (i = 0; i < myGoods.length; i++) {
        // clone form and give it an Id
        let formClone = document.getElementById('formattedGoodsItem').cloneNode(true)
        let goodsFormId = 'formattedGoods' + i.toString();
        formClone.id = goodsFormId;
    // update its fields according to its Id
        formClone.children[0].children[1].innerHTML = myGoods[i].name;
        if (myGoods[i].property == "None"){
            formClone.children[1].children[1].innerHTML = "N/A";
        }else{
            formClone.children[1].children[1].innerHTML = myGoods[i].property;
        }
        if (myGoods[i].value == 0){

            formClone.children[2].children[1].innerHTML = "N/A";
        }else{
            formClone.children[2].children[1].innerHTML = formatCurrency(myGoods[i].value);
        }
        if (myGoods[i].offer == 0){
            formClone.children[2].children[3].innerHTML = "N/A";
        }else{
            formClone.children[2].children[3].innerHTML = formatCurrency(myGoods[i].offer);
        }
        if (myGoods[i].sold){
            formClone.children[3].children[1].innerHTML = "Yes!";
            if (myGoods[i].soldTo == "Select Contact"){
                formClone.children[3].children[3].innerHTML = "undeclared";
            }else{
                formClone.children[3].children[3].innerHTML = myGoods[i].soldTo;
            }
            formClone.children[3].children[2].style.display = "inline-block";
            formClone.children[3].children[3].style.display = "inline-block";
        }
        else {
            formClone.children[3].children[1].innerHTML = "Not yet..";
        }
        formClone.children[4].children[1].innerHTML = myGoods[i].address;
        formClone.children[5].children[1].innerHTML = myGoods[i].notes;
        formClone.style.display = "block";
        formClone.classList.remove('hiddenLi');
    // append it to the ul
        document.getElementById('formattedGoodsList').appendChild(formClone);
        
    }
}

function formatExpenses(){
    for (i = 0; i < myExpenses.length; i++) {
        // clone form and give it an Id
        let formClone = document.getElementById('formattedExpensesItem').cloneNode(true)
        let expenseFormId = 'expensesDisplay' + i.toString();
        formClone.id = expenseFormId;
        // update its fields according to its Id
        formClone.children[0].children[1].innerHTML = myExpenses[i].name;
        formClone.children[1].children[1].innerHTML = myExpenses[i].payableTo;
        formClone.children[2].children[1].innerHTML = formatCurrency(myExpenses[i].amount);
        if (myProperties[i].date == ""){
            formClone.children[3].children[1].innerHTML = "N/A";
        }
        else{
            let formattedDate = getDate(myProperties[i].date)
            formClone.children[3].children[1].innerHTML = formattedDate;
        }
        formClone.children[4].children[1].innerHTML = myExpenses[i].notes;
        formClone.style.display = "block";
        formClone.classList.remove('hiddenLi');
        // append it to the ul
        document.getElementById('formattedExpensesList').appendChild(formClone);
    }   
}

function stopPrintTab(){
    event.preventDefault();
}