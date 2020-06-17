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
// Generating options & list of goods
    createPropertyOptions();
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
        formClone.firstChild.nextElementSibling.goodsName.value = myGoods[i].name;
        formClone.firstChild.nextElementSibling.goodsProperty.value = myGoods[i].property;
        formClone.firstChild.nextElementSibling.goodsValue.value = myGoods[i].value;
        formClone.firstChild.nextElementSibling.goodsOffer.value = myGoods[i].offer;
        formClone.firstChild.nextElementSibling.goodsAddress.value = myGoods[i].address;
        formClone.firstChild.nextElementSibling.goodsNotes.value = myGoods[i].notes;
        formClone.firstChild.nextElementSibling.goodsSold.checked = myGoods[i].sold;
        formClone.firstElementChild[6].addEventListener('click', saveGoods);
        formClone.firstElementChild[7].addEventListener('click', deleteGoods);
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
        let newOption = createNewOption(i);
        document.getElementById('formNewGoods').children[3].appendChild(newOption);

        let newOption2 = createNewOption(i);
        document.getElementById('goodsDisplayForm').children[3].appendChild(newOption2);
    }
}

function createNewOption(id){
    let newOption = document.createElement('option');
    newOption.id = "option" + i.toString();
    newOption.value = myProperties[id].name;
    newOption.appendChild(document.createTextNode(myProperties[id].name));
    return newOption;
}

