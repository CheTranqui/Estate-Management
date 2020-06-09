let myGoods = [];
if (localStorage["goods"] != undefined && localStorage["goods"][0] != undefined){
    let startingGoodsJSONString = localStorage.getItem("goods");
    myGoods = JSON.parse(startingGoodsJSONString);
    createSoldList("Goods");
}

let myProperties = [];
if (localStorage["properties"] != undefined && localStorage["goods"][0] != undefined){
    let startingPropertiesJSONString = localStorage.getItem("properties");
    myProperties = JSON.parse(startingPropertiesJSONString);
    createSoldList("Props");
}

let myContacts = [];
if (localStorage["contacts"] != undefined  && localStorage["contacts"][0] != undefined) {
    let startingContactsJSONString = localStorage.getItem("contacts");
    myContacts = JSON.parse(startingContactsJSONString);
}

document.addEventListener('DOMContentLoaded', () => {
    getPropertyValue();
    getGoodsValue();
});

function createSoldList(Type){
    if (Type == "Props"){
        for (i = 0; i < myProperties.length; i++){
            if (myProperties[i].sold){
                let formClone = document.getElementById('soldPropertiesListItem').cloneNode(true);
                let currentId = "soldPropertiesId" + i.toString();
                formClone.id = currentId;
                formClone.children[0].href = "properties.html#propertyId" + i.toString();
                formClone.children[0].innerHTML = myProperties[i].name;
                // getContactId(myProperties)
                // formClone.children[1].href = "contacts.html#contactId" + 
                formClone.children[1].children[0].innerHTML = myProperties[i].date;
                formClone.children[1].children[2].innerHTML = myProperties[i].offer;
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
                formClone.children[0].href = "goods.html#goodsId" + i.toString();
                formClone.children[0].innerHTML = myGoods[i].name;
                // getContactId(myProperties)
                // formClone.children[1].href = "contacts.html#contactId" + 
                formClone.children[1].children[0].innerHTML = myGoods[i].date;
                formClone.children[1].children[2].innerHTML = myGoods[i].offer;
                formClone.style.display = "list-item";
                document.getElementById('soldGoodsList').appendChild(formClone);
            }
        }
    }
}

// function getContactId(array){
//     for (i = 0; i < myContacts.length; i++){

//     }
// }

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