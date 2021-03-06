// loadData.js automatically runs as the page is loaded.

let currentTask = {};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnAddTask').addEventListener('click', addTask);
    document.getElementById('btnSaveTask').addEventListener('click', saveTask);
    document.getElementById('btnDeleteTask').addEventListener('click', deleteTask);
    document.getElementById('btnAddTaskCollapser').addEventListener('click', collapseForm);
// loadData from LocalStorage
    myTasks = loadData('tasks');
    myContacts = loadData('contacts');
    myProperties = loadData('properties');
    myGoods = loadData('goods');
    myExpenses = loadData('expenses');
// create list
    createTaskList(myTasks);
    createContactsSummary(myContacts);
    getFinancials();
});


// allows for a button marked with class 'collapsible'
// to collapse/uncollapse immediate siblings if content is initially hidden in CSS.
function collapseForm() {
    if (this.nextElementSibling.style.display === "block"
     && this.nextElementSibling.id == "newTaskForm") {
        this.nextElementSibling.style.display = "none";
    }
    else if (this.nextElementSibling.id == "newTaskForm"){
        this.nextElementSibling.style.display = "block";
    }
};

// halting default action and saving each field into an object.
function addTask() {
    event.preventDefault();
    currentTask = {
        name: document.getElementById('newTaskForm').elements.taskName.value,
        status: document.getElementById('newTaskForm').elements.taskStatus.value,
        date: document.getElementById('newTaskForm').elements.taskDate.value,
    };
    // adding this object to the overall array
    console.log(currentTask);
    myTasks.push(currentTask);
    
    alert("Task added: " + currentTask.name + ".");
    document.getElementById('newTaskForm').reset();
    
    // updating/replacing the localStorage version.
    updateTasks();

    deleteDisplayList(-1);
    createTaskList(myTasks);
   
    // collapse the Property form
    document.getElementById('btnAddTaskCollapser').nextElementSibling.style.display = "none";
}

// generates the ul of properties from the myTasks array.
function createTaskList(array) {
    sortArray(array);
    // create one form per array entry
    // populate it from each entry as well
    if (array.length > 0) {
        for (i = 0; i < array.length; i++) {
        // clone form and give it an Id
            let formClone = document.getElementById('taskListHidden').cloneNode(true)
            let taskFormId = 'taskDisplay' + i.toString();
            formClone.id = taskFormId;
        // update its fields according to its Id
            formClone.childNodes[1].taskName.value = myTasks[i].name;
            formClone.childNodes[1].taskStatus.value = myTasks[i].status;
            formClone.childNodes[1].taskDate.value = myTasks[i].date;
            formClone.childNodes[1][3].addEventListener('click', saveTask);
            formClone.childNodes[1][4].addEventListener('click', deleteTask);
        // append it to the ul
            formClone.style.display = "";
            document.getElementById('taskListDisplay').appendChild(formClone);
        };
    }
    // once all other forms are set, modify id0
}

function getTaskId(element){
    let taskFormId = element.parentNode.parentNode.id;
    let myTaskId = parseInt(taskFormId.substring(11));
    return myTaskId;
}

function saveTask(){
    event.preventDefault();
    let myTaskId = getTaskId(this)
    // search myTasks and overwrite entry with same name with entry's stuff.
    myTasks[myTaskId].name = this.parentNode.taskName.value;
    myTasks[myTaskId].status = this.parentNode.taskStatus.value;
    myTasks[myTaskId].date = this.parentNode.taskDate.value;

    // update localStorage version
    updateTasks();

    sortDisplay();
}

function deleteTask(){
    event.preventDefault();
    let myTaskId = getTaskId(this);
    // search myTasks for this node's name and remove that key/value pair
    myTasks.splice(myTaskId, 1);
    
    // remove this entry from the ul

    // update localStorage version
    updateTasks();

    // recreate task list
    deleteDisplayList(1);
    createTaskList(myTasks);
}

function updateTasks(){
    tasksJSONString = JSON.stringify(myTasks);
    localStorage.setItem("tasks", tasksJSONString);
}

// 'adjustment' is to allow you to delete more or fewer items than currently exists within the object.
function deleteDisplayList(adjustment){
    let objLength = myTasks.length + adjustment;
    for (i = 0; i < objLength; i++){
        document.getElementById('taskDisplay' + i.toString()).remove();
    }
}

function sortArray(array){
    array.sort((a,b) => {
        if (a.status != "Completed" && b.status != "Completed"){
            if (a.date > b.date){
                return 1;}
            else if (a.date < b.date){
                return -1;}
            else {
                if (a.status == b.status && a.status != "Completed"){
                    if (a.name > b.name){
                        return 1;}
                    else{
                        return -1;}
                }
                else if (a.status == "Pending" && b.status != "Pending"){
                    return -1;}
                else if (b.status == "Pending" && a.status != "Pending"){
                    return 1;}
                else if (a.status == "Due" && b.status == "Completed"){
                    return -1;}
                else if (a.status == "Completed" && b.status != "Completed"){
                    return 1;}
            }
        }
        else{
            if (a.status == "Completed" && b.status != "Completed"){
                return 1;}
            else if (a.status != "Completed" && b.status == "Completed"){
                return -1;}
            else if (a.status == "Completed" && b.status == "Completed"){
                if (a.date > b.date){
                    return 1;}
                else if (a.date < b.date){
                    return -1;}
                else if (a.date == b.date){
                    if (a.name > b.name){
                        return 1;}
                    else{
                        return -1;
                    }
                }
            }
        }
    })
}

function sortDisplay(){
    deleteDisplayList(0);
    createTaskList(myTasks);
}

function createContactsSummary(){
    for (i = 0; i < myContacts.length; i++){
        let formClone = document.getElementById('contactSummaryItem').cloneNode(true);
        let myFormId = "contactSummary" + i.toString();
        let myContactId = "contactDisplay" + i.toString();
        formClone.id = myFormId;

        formClone.childNodes[1].childNodes[1].href = "Contacts.html#" + myContactId;
        formClone.childNodes[1].childNodes[1].innerHTML = myContacts[i].name;
        formClone.childNodes[1].childNodes[3].innerHTML = "Phone: " + myContacts[i].phone;
        formClone.style.display = "block";

        document.getElementById('contactSummaryList').appendChild(formClone);
    }
}

// acquires totals from format.js
// sets html Id to that value for each item
function getFinancials(){
    let propertyValue = getPropertyValue();
    setTotal('overallSummarySoldProperties', formatCurrency(propertyValue));

    let goodsValue = getGoodsValue();
    setTotal('overallSummarySoldGoods', formatCurrency(goodsValue));

    let soldTotal = propertyValue + goodsValue;
    let formattedSoldTotal = formatCurrency(soldTotal);
    setTotal('overallSummarySoldTotal', formattedSoldTotal);

    let expensesValue = getTotalExpenses();
    setTotal('overallSummaryExpensesTotal', formatCurrency(expensesValue));

    let balance = (soldTotal - expensesValue);
    setTotal('overallSummaryBalance', formatCurrency(balance));
}

function setTotal(element, qty){
    document.getElementById(element).innerHTML = qty;
}