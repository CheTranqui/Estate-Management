let myGoods = [];
let myProperties = [];
let myTasks = [];
let myContacts = [];
let myExpenses = [];

function loadData(dataName){
    if (dataName == "goods"){
        if (localStorage["goods"] != undefined  && localStorage["goods"][0] != undefined) {
            let startingGoodsJSONString = localStorage.getItem("goods");
            myGoods = JSON.parse(startingGoodsJSONString);
        };
        return myGoods;
    }
    else if (dataName == "properties"){
        if (localStorage["properties"] != undefined  && localStorage["properties"][0] != undefined) {
            let startingPropertiesJSONString = localStorage.getItem("properties");
            myProperties = JSON.parse(startingPropertiesJSONString);
        };
        return myProperties
    }
    else if (dataName == "tasks"){
        if (localStorage["tasks"] != undefined  && localStorage["tasks"][0] != undefined) {
            let startingTasksJSONString = localStorage.getItem("tasks");
            myTasks = JSON.parse(startingTasksJSONString);
        };
        return myTasks;
    }
    else if (dataName == "contacts"){
        if (localStorage["contacts"] != undefined  && localStorage["contacts"][0] != undefined) {
            let startingContactsJSONString = localStorage.getItem("contacts");
            myContacts = JSON.parse(startingContactsJSONString);
        };
        return myContacts;
    }
    else if (dataName == "expenses"){
        if (localStorage["expenses"] != undefined  && localStorage["expenses"][0] != undefined) {
            let startingExpensesJSONString = localStorage.getItem("expenses");
            myExpenses = JSON.parse(startingExpensesJSONString);
            };
        return myExpenses;
    }
}