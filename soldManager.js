let myGoods = [];
if (localStorage["goods"] != undefined && localStorage["goods"][0] != undefined){
    let startingGoodsJSONString = localStorage.getItem("goods");
    myGoods = JSON.parse(startingGoodsJSONString);
    
}

let myProperties = [];
if (localStorage["properties"] != undefined && localStorage["goods"][0] != undefined){
    let startingPropertiesJSONString = localStorage.getItem("properties");
    myProperties = JSON.parse(startingPropertiesJSONString);
}

let myContacts = [];
if (localStorage["contacts"] != undefined  && localStorage["contacts"][0] != undefined) {
    let startingContactsJSONString = localStorage.getItem("contacts");
    myContacts = JSON.parse(startingContactsJSONString);
}

document.addEventListener('DOMContentLoaded', () => {
    getPropertyValue();
    getGoodsValue();
    createSoldList("Props");
    createSoldList("Goods");
});

function createSoldList(Type){
    if (Type == "Props"){
        for (i = 0; i < myProperties.length; i++){
            if (myProperties[i].status == "Sold"){
                let formClone = document.getElementById('soldPropertiesListItem').cloneNode(true);
                let currentId = "soldPropertiesId" + i.toString();
                formClone.id = currentId;
                formClone.children[1].href = "properties.html#propertyId" + i.toString();
                formClone.children[1].innerHTML = myProperties[i].name;
                let myContactId = getContactId(myProperties[i])
                if (myContactId == "none declared"){
                    formClone.children[3].href="properties.html";
                    formClone.children[3].innerHTML = myContactId;
                }
                else{
                    formClone.children[3].href = "contacts.html#displayContact" + myContactId.toString();
                    formClone.children[3].innerHTML = myContacts[myContactId].name;    
                }
                formClone.children[4].children[0].innerHTML = getDate(myProperties[i].date);
                formClone.children[4].children[2].innerHTML = "$" + myProperties[i].offer;
                formClone.style.display = "list-item";
                document.getElementById('soldPropertiesList').appendChild(formClone);
            }
        }
    }
    if (Type == "Goods"){
        for (i = 0; i < myGoods.length; i++){
            if (myGoods[i].sold){
                let formClone = document.getElementById('soldPropertiesListItem').cloneNode(true);
                let currentId = "soldGoodsId" + i.toString();
                formClone.id = currentId;
                formClone.children[1].href = "goods.html#goodsId" + i.toString();
                formClone.children[1].innerHTML = myGoods[i].name;
                let myContactId = getContactId(myGoods[i]);
                if (myContactId == "none declared"){
                    formClone.children[3].href="goods.html";
                    formClone.children[3].innerHTML = myContactId;    
                }
                else{
                    formClone.children[3].href = "contacts.html#displayContact" + myContactId.toString();
                    formClone.children[3].innerHTML = myContacts[myContactId].name;    
                }
                formClone.children[4].children[0].innerHTML = getDate(myGoods[i].date);
                formClone.children[4].children[2].innerHTML = myGoods[i].offer;
                formClone.style.display = "list-item";
                document.getElementById('soldGoodsList').appendChild(formClone);
            }
        }
    }
}

function getContactId(object){
    if (object.buyer != undefined && object.buyer != "selectContact"){
        for (i = 0; i < myContacts.length; i++){
            if (myContacts[i].name == object.buyer){
                return i;
            }
        }
    }
    else{
        return "none declared";
    }
}

function getPropertyValue(){
    let myTotal = 0;
    for (i = 0; i < myProperties.length; i++){
        if (myProperties[i].status == "Sold"){
        myTotal += parseInt(myProperties[i].offer);
        }
    }
    updateValue("properties", myTotal);
}

function getGoodsValue(){
    let myTotal = 0;
    for (i = 0; i < myGoods.length; i++){
        if (myGoods[i].offer > 0){
        myTotal += parseInt(myGoods[i].offer);
        }
    }
    updateValue("goods", myTotal);
}

function updateValue(type, mytotal){
    if (type == "goods"){
        myElement = document.getElementById('soldGoodsValue');
     
    }
    else if (type == "properties"){
        myElement = document.getElementById('soldPropertyValue');
    }
    myElement.innerHTML = "$" + mytotal.toString();
}

function getDate(date){
    if (date == undefined){
        return date;
    }
    else{
        let myMonthText = "";
        let myYear = date.substring(0,4);
        let myMonth = parseInt(date.substring(5,7));
        switch(myMonth){
            case 1:
                myMonthText = "January";
                break;
            case 2:
                myMonthText = "February";
                break;
            case 3:
                myMonthText = "March";
                break;
            case 4:
                myMonthText = "April";
                break;
            case 5:
                myMonthText = "May";
                break;
            case 6:
                myMonthText = "June";
                break;
            case 7:
                myMonthText = "July";
                break;
            case 8:
                myMonthText = "August";
                break;
            case 9:
                myMonthText = "September";
                break;
            case 10:
                myMonthText = "October";
                break;
            case 11:
                myMonthText = "November";
                break;
            case 12:
                myMonthText = "December";
        }
        let myDay = date.substring(9);
        let myFormattedDate = myMonthText + " " + myDay + ", " + myYear;
        return myFormattedDate;
    }
    
}