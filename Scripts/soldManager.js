// loadData.js automatically runs as the page is loaded.

document.addEventListener('DOMContentLoaded', () => {
// Load data from localStorage
    myContacts = loadData('contacts');
    myGoods = loadData('goods');
    myProperties = loadData('properties');

// Get values
    myTotal = getPropertyValue();
    updateValue("properties", myTotal);
    
    myTotal = getGoodsValue();
    updateValue("goods", myTotal);

// create lists
    createSoldList("properties");
    createSoldList("goods");
});

function createSoldList(Type){
    if (Type == "properties"){
        for (let i = 0; i < myProperties.length; i++){
            if (myProperties[i].status == "Sold"){
                let formClone = document.getElementById('soldPropertiesListItem').cloneNode(true);
                let currentId = "soldPropertiesId" + i.toString();
                formClone.id = currentId;
                formClone.children[1].href = "properties.html#propertyId" + i.toString();
                formClone.children[1].innerHTML = myProperties[i].name;
                let myContactId = getContactId(myProperties[i], "properties")
                if (myContactId == "none declared"){
                    formClone.children[3].href="properties.html";
                    formClone.children[3].innerHTML = myContactId;
                }
                else{
                    formClone.children[3].href = "contacts.html#contactDisplay" + myContactId.toString();
                    formClone.children[3].innerHTML = myContacts[myContactId].name;    
                }
                formClone.children[4].children[0].innerHTML = getDate(myProperties[i].date);
                formClone.children[4].children[2].innerHTML = formatCurrency(myProperties[i].offer);
                formClone.style.display = "list-item";
                document.getElementById('soldPropertiesList').appendChild(formClone);
            }
        }
    }
    if (Type == "goods"){
        for (let i = 0; i < myGoods.length; i++){
            if (myGoods[i].sold){
                let formClone = document.getElementById('soldPropertiesListItem').cloneNode(true);
                let currentId = "soldGoodsId" + i.toString();
                formClone.id = currentId;
                formClone.children[1].href = "goods.html#goodsId" + i.toString();
                formClone.children[1].innerHTML = myGoods[i].name;
                let myContactId = getContactId(myGoods[i], "goods");
                if (myContactId == "none declared"){
                    formClone.children[3].innerHTML = "no buyer declared"
                }
                else{
                    formClone.children[3].href = "contacts.html#contactDisplay" + myContactId.toString();
                    formClone.children[3].innerHTML = myContacts[myContactId].name;    
                }
                formClone.children[4].innerHTML = "Sold for: " + formatCurrency(myGoods[i].offer);
                // formClone.children[4].children[2].innerHTML = myGoods[i].offer;
                formClone.style.display = "list-item";
                document.getElementById('soldGoodsList').appendChild(formClone);
            }
        }
    }
}

function getContactId(object, string){
    if (string == "properties"){
        myBuyer = object.buyer;
    }
    else{
        myBuyer = object.soldTo;
    }
    if (myBuyer != undefined
        && myBuyer != null
        && myBuyer != "selectContact"
        && myBuyer != "Select Contact"
        && myBuyer != "(Select Contact)"
        && myBuyer != "none"
        && myBuyer != ""){
        for (let j = 0; j < myContacts.length; j++){
            if (myContacts[j].name == myBuyer){
                return j;
            }
        }
    }
    else{
        return "none declared";
    }
}

function updateValue(type, mytotal){
    if (type == "goods"){
        myElement = document.getElementById('soldGoodsValue');
     
    }
    else if (type == "properties"){
        myElement = document.getElementById('soldPropertyValue');
    }
    myElement.innerHTML = formatCurrency(myTotal);
}