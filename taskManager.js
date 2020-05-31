// myTasks is an array of objects.
// currentTask is an object that contains a property's information.
// initially, we're creating these objects and prepopulating myTasks.
let myTasks = [];
if (localStorage["tasks"] != undefined  && localStorage["tasks"][0] != undefined) {
    startingTasksJSONString = localStorage.getItem("tasks");
    myTasks = JSON.parse(startingTasksJSONString);
    createTaskList(myTasks)
}
let currentTask = {};
    document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnAddTask').addEventListener('click', addTask);
    document.getElementById('btnSaveTask').addEventListener('click', saveTask);
    document.getElementById('btnDeleteTask').addEventListener('click', deleteTask);
    document.getElementById('btnAddTaskCollapser').addEventListener('click', collapseForm);
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
    
    // adding to list of properties on page
        let formClone = document.getElementById('taskListHidden').cloneNode(true)
        let currentTaskId = (myTasks.length - 1).toString();
        let taskFormId = 'taskDisplay' + currentTaskId;
        formClone.id = taskFormId;
        console.log(formClone.id);
    // update its fields according to its Id
        formClone.childNodes[1].taskName.value = myTasks[currentTaskId].name;
        formClone.childNodes[1].taskStatus.value = myTasks[currentTaskId].status;
        formClone.childNodes[1].taskDate.value = myTasks[currentTaskId].date;
        formClone.childNodes[1][3].addEventListener('click', saveTask);
        formClone.childNodes[1][4].addEventListener('click', deleteTask);
        document.getElementById('taskListDisplay').appendChild(formClone);
    // alerting user of addition and clearing the form
    alert("Task added: " + currentTask.name + ".");
    document.getElementById('newTaskForm').reset();
    
    // updating/replacing the localStorage version.
    updateTasks();
   
    // collapse the Property form
    document.getElementById('btnaddTaskCollapser').nextElementSibling.nextElementSibling.style.display = "none";
}

function updateTasks(){
    tasksJSONString = JSON.stringify(myTasks);
    localStorage.setItem("tasks", tasksJSONString);
}


// generates the ul of properties from the myTasks array.
function createTaskList(array) {
    // create one form per array entry
    // populate it from each entry as well
    if (array.length > 1) {
        for (i = 1; i < array.length; i++) {
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
            formClone.style.display = "block";
            document.getElementById('taskListDisplay').appendChild(formClone);
        };
    }
    // once all other forms are set, modify id0
}

function saveTask(){
    event.preventDefault();
    // search myTasks and overwrite entry with same name with entry's stuff.
    for (i = 0; i < myTasks.length; i++){
        if (myTasks[i].name == this.parentNode.taskName.value){
            myTasks[i].status = this.parentNode.taskStatus.value;
            myTasks[i].date = this.parentNode.taskDate.value;
        }
    }

    // update localStorage version
    updateTasks();
}

function deleteTask(){
    event.preventDefault();
    
    // search myTasks for this node's name and remove that key/value pair
    for (i = 0; i < myTasks.length; i++){
        if (myTasks[i].name == this.parentNode.taskName.value) {
        myTasks.splice(i, 1);
        }
    }
    
    // remove this entry from the ul
    this.parentNode.remove();
    
    // update localStorage
    updateTasks();
}