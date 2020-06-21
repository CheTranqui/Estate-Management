// loadData.js automatically runs as the page is loaded.

let currentGoods = {};

// setting this event listener for when the Save goods button is clicked.
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnAddGoods').addEventListener('click', addGoods);
    document.getElementById('btnSaveGoods').addEventListener('click', saveGoods);
    document.getElementById('btnDeleteGoods').addEventListener('click', deleteGoods);
    document.getElementById('btnAddGoodsCollapser').addEventListener('click', collapseForm);
// Loading the relevant data from LocalStorage
    myGoods = loadData('goods');
    myProperties = loadData('properties');
    myContacts = loadData('contacts');
// Generating options & list of goods
    countArrayLength(myGoods, 'goodsCount');
    createPropertyOptions();
    createSoldToOptions();
    createGoodsList(myGoods);
});


// halting default action and saving each field into an object.
function addGoods() {
    event.preventDefault();
    currentGoods = {
        name: document.getElementById('formNewGoods').elements.goodsName.value,
        property: document.getElementById('formNewGoods').elements.goodsProperty.value,
        value: document.getElementById('formNewGoods').elements.goodsValue.value,
        offer: document.getElementById('formNewGoods').elements.goodsOffer.value,
        address: document.getElementById('formNewGoods').elements.goodsAddress.value,
        notes: document.getElementById('formNewGoods').elements.goodsNotes.value,
        sold: false,
    };
    // adding this object to the overall array
    console.log(currentGoods);
    myGoods.push(currentGoods);
    
    // alerting user of addition and clearing the form
    alert("Goods added: " + currentGoods.name + ".");
    document.getElementById('formNewGoods').reset();
    
    // updating/replacing the localStorage version.
    updateGoods();
    countArrayLength(myGoods, 'goodsCount');
   
    deleteDisplayList(-1);
    createGoodsList(myGoods);

    // collapse the goods form
    document.getElementById('btnAddGoodsCollapser').nextElementSibling.nextElementSibling.style.display = "none";
}

function updateGoods(){
    goodsJSONString = JSON.stringify(myGoods);
    localStorage.setItem("goods", goodsJSONString);
}


// allows for a button marked with class 'collapsible'
// to collapse/uncollapse immediate siblings if content is initially hidden in CSS.
function collapseForm() {
    if (this.nextElementSibling.nextElementSibling.style.display === "block" &&
     this.nextElementSibling.nextElementSibling.id == "formNewGoods") {
        this.nextElementSibling.nextElementSibling.style.display = "none";
    }
    else if (this.nextElementSibling.nextElementSibling.id == "formNewGoods"){
        this.nextElementSibling.nextElementSibling.style.display = "block";
    }
};

// generates the ul of goods from the myGoods array.
function createGoodsList(array) {
    sortArray(array);
    // create one form per array entry
    // populate it from each entry as well
    for (i = 0; i < array.length; i++) {
        // clone form and give it an Id
        let formClone = document.getElementById('goodsDisplayItem').cloneNode(true)
        let goodsFormId = 'goodsDisplay' + i.toString();
        formClone.id = goodsFormId;
    // update its fields according to its Id
        formClone.children[0].goodsName.value = myGoods[i].name;
        formClone.children[0].goodsProperty.value = myGoods[i].property;
        formClone.children[0].goodsValue.value = myGoods[i].value;
        formClone.children[0].goodsOffer.value = myGoods[i].offer;
        formClone.children[0].goodsAddress.value = myGoods[i].address;
        formClone.children[0].goodsNotes.value = myGoods[i].notes;
        formClone.children[0].goodsSold.checked = myGoods[i].sold;
        if (!myGoods[i].soldTo){
            myGoods[i].soldTo = "Select Contact";
        }
        formClone.children[0].goodsSoldTo.value = myGoods[i].soldTo;
        formClone.children[0].children[16].addEventListener('click', saveGoods);
        formClone.children[0].children[17].addEventListener('click', deleteGoods);
        formClone.children[0].goodsSold.addEventListener('change', toggleBuyer);
        if (formClone.children[0].goodsSold.checked){
            // show Sold To label and dropdown
            formClone.children[0].children[20].style.display = "inline-block";
            formClone.children[0].goodsSoldTo.style.display = "inline-block";
        }
        else{
            formClone.children[0].children[20].style.display = "none";
            formClone.children[0].goodsSoldTo.style.display = "none";
        }
        formClone.children[0].children
        formClone.style.display = "block";
    // append it to the ul
        document.getElementById('goodsDisplayList').appendChild(formClone);

    }
}

function sortArray(array){
    array.sort((a,b) => {
        if (a.sold){
            if (a.sold && b.sold){
                if (a.name > b.name){
                    return 1;
                }
                else{
                    return -1;
                }
            }
            else{
                return 1;
            }
        }
        else if (!a.sold && b.sold){
                return -1;
        }
        else if (a.name >= b.name){
            return 1;
        }
        else{
            return -1;
        }
    })
}

function getGoodsId(element){
    let goodsFormId = element.parentNode.parentNode.id;
    let myGoodsId = parseInt(goodsFormId.substring(12));
    return myGoodsId;
}

function saveGoods(){
    event.preventDefault();
    let myGoodsId = getGoodsId(this);
    // search myGoods and overwrite entry with same name with entry's stuff.
    myGoods[myGoodsId].name = this.parentNode.goodsName.value;
    myGoods[myGoodsId].property = this.parentNode.goodsProperty.value;
    myGoods[myGoodsId].value = this.parentNode.goodsValue.value;
    myGoods[myGoodsId].offer = this.parentNode.goodsOffer.value;
    myGoods[myGoodsId].address = this.parentNode.goodsAddress.value;
    myGoods[myGoodsId].notes = this.parentNode.goodsNotes.value;
    myGoods[myGoodsId].sold = this.parentNode.goodsSold.checked;
    myGoods[myGoodsId].soldTo = this.parentNode.goodsSoldTo.value;

    // update localStorage version
    updateGoods();
    
    sortDisplay();
}

function sortDisplay(){
    deleteDisplayList(0);
    createGoodsList(myGoods);
}

function deleteGoods(){
    event.preventDefault();
    let myGoodsId = getGoodsId(this);
    // search myGoods for this node's name and remove that key/value pair
    myGoods.splice(myGoodsId, 1);

    // update localStorage
    updateGoods();
    countArrayLength(myGoods, 'goodsCount');

    // recreate goods list
    deleteDisplayList(1);
    createGoodsList(myGoods);
}

// 'adjustment' is to allow you to delete more or fewer items than currently exists within the object.
function deleteDisplayList(adjustment){
    let objLength = myGoods.length + adjustment;
    for (i = 0; i < objLength; i++){
        document.getElementById('goodsDisplay' + i.toString()).remove();
    }
}

function createPropertyOptions(){
    for (i = 0; i < myProperties.length; i++){
        let newOption = createNewOption(i, myProperties, "property");
        document.getElementById('formNewGoods').children[3].appendChild(newOption);

        let newOption2 = createNewOption(i, myProperties, "property");
        document.getElementById('goodsDisplayForm').children[3].appendChild(newOption2);
    }
}

function createSoldToOptions(){
    for (i = 0; i < myContacts.length; i++){
        let newOption = createNewOption(i, myContacts, "contacts");
        document.getElementById('goodsDisplayForm').children[21].appendChild(newOption);
    }
}

function createNewOption(id, array, string){
    let newOption = document.createElement('option');
    let upperCaseLetter = string.charAt(0).toUpperCase();
    let newString = upperCaseLetter + string.slice(1);
    newOption.id = "option" + newString + i.toString();
    newOption.value = array[id].name;
    newOption.appendChild(document.createTextNode(array[id].name));
    return newOption;
}

function toggleBuyer(){
    if (this.checked){
        this.parentNode.children[20].style.display = "inline-block";
        this.parentNode.goodsSoldTo.style.display = "inline-block";
    }
    else{
        this.parentNode.children[20].style.display = "none";
        this.parentNode.goodsSoldTo.style.display = "none";
    }
}