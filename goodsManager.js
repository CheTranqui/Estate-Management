// myGoods is an array of objects.
// currentGoods is an object that contains a goods's information.
// initially, we're creating these objects and prepopulating myGoods.
let myGoods = [];
if (localStorage["goods"] != undefined  && localStorage["goods"][0] != undefined) {
    startingGoodsJSONString = localStorage.getItem("goods");
    myGoods = JSON.parse(startingGoodsJSONString);
    createGoodsList(myGoods)
}
let currentGoods = {};

let myProperties = [];
if (localStorage["properties"] != undefined  && localStorage["properties"][0] != undefined) {
    startingPropertiesJSONString = localStorage.getItem("properties");
    myProperties = JSON.parse(startingPropertiesJSONString);
    createPropertyOptions()
}

// setting this event listener for when the Save goods button is clicked.
    document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnAddGoods').addEventListener('click', addGoods);
    document.getElementById('btnSaveGoods').addEventListener('click', saveGoods);
    document.getElementById('btnDeleteGoods').addEventListener('click', deleteGoods);
    document.getElementById('btnAddGoodsCollapser').addEventListener('click', collapseForm);
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
    };
    // adding this object to the overall array
    console.log(currentGoods);
    myGoods.push(currentGoods);
    
    // addint to list of goods on page
    let formClone = document.getElementById('goodsDisplayItem').cloneNode(true)
        let currentGoodsId = (myGoods.length - 1).toString();
        let goodsFormId = 'goodsDisplay' + currentGoodsId;
        formClone.id = goodsFormId;
        console.log(formClone.id);
    // update its fields according to its Id
        formClone.firstChild.nextElementSibling.goodsName.value = myGoods[currentGoodsId].name;
        formClone.firstChild.nextElementSibling.goodsProperty.value = myGoods[currentGoodsId].property;
        formClone.firstChild.nextElementSibling.goodsValue.value = myGoods[currentGoodsId].value;
        formClone.firstChild.nextElementSibling.goodsOffer.value = myGoods[currentGoodsId].offer;
        formClone.firstChild.nextElementSibling.goodsAddress.value = myGoods[currentGoodsId].address;
        formClone.firstChild.nextElementSibling.goodsNotes.value = myGoods[currentGoodsId].notes;
        formClone.firstElementChild[6].addEventListener('click', saveGoods);
        formClone.firstElementChild[7].addEventListener('click', deleteGoods);
        formClone.style.display = "block";
        document.getElementById('goodsDisplayList').appendChild(formClone);
    // alerting user of addition and clearing the form
    alert("Goods added: " + currentGoods.name + ".");
    document.getElementById('formNewGoods').reset();
    
    // updating/replacing the localStorage version.
    updateGoods();
   
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
        formClone.firstChild.nextElementSibling.goodsOffer.value = myGoods[i].Offer;
        formClone.firstChild.nextElementSibling.goodsAddress.value = myGoods[i].address;
        formClone.firstChild.nextElementSibling.goodsNotes.value = myGoods[i].notes;
        formClone.firstElementChild[6].addEventListener('click', saveGoods);
        formClone.firstElementChild[7].addEventListener('click', deleteGoods);
        formClone.style.display = "block";
    // append it to the ul
        document.getElementById('goodsDisplayList').appendChild(formClone);

    }
}

function saveGoods(){
    event.preventDefault();
    // search myGoods and overwrite entry with same name with entry's stuff.
    for (i = 0; i < myGoods.length; i++){
        if (myGoods[i].name == this.parentNode.goodsName.value){
            // store the old name into a variable
            //create a new variable with the updated value?
            myGoods[i].role = this.parentNode.goodsProperty.value;
            myGoods[i].phone = this.parentNode.goodsValue.value;
            myGoods[i].email = this.parentNode.goodsOffer.value;
            myGoods[i].address = this.parentNode.goodsAddress.value;
            myGoods[i].notes = this.parentNode.goodsNotes.value;
        }
    }

    // update localStorage version
    updateGoods();
}

function deleteGoods(){
    event.preventDefault();
    
    // search myGoods for this node's name and remove that key/value pair
    for (i = 0; i < myGoods.length; i++){
        if (myGoods[i].name == this.parentNode.goodsName.value){
        myGoods.splice(i, 1);
        }
    }
    
    // remove this entry from the ul
    this.parentNode.parentNode.remove();
    
    // update localStorage
    updateGoods();
}

function createPropertyOptions(){
    let selectNode = document.getElementById('formNewGoods').children[3];
    let selectNode2 = document.getElementById('goodsDisplayForm').children[3];
    for (i = 0; i < myProperties.length; i++){
        goodsPropertyName = myProperties[i].name;
        goodsPropertyName2 = myProperties[i].name;
        let newOption = document.createElement('option');
        let newOption2 = document.createElement('option');
        newOption.appendChild(document.createTextNode(goodsPropertyName));
        newOption2.appendChild(document.createTextNode(goodsPropertyName2));
        newOption.value = goodsPropertyName;
        newOption2.value = goodsPropertyName2;
        selectNode.appendChild(newOption);
        selectNode2.appendChild(newOption2);
    };
}