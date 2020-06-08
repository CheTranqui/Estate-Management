// myProperties is an array of objects.
// currentProperty is an object that contains a property's information.
// initially, we're creating these objects and prepopulating myProperties.
let myProperties = [];
if (localStorage["properties"] != undefined  && localStorage["properties"][0] != undefined) {
    startingPropertiesJSONString = localStorage.getItem("properties");
    myProperties = JSON.parse(startingPropertiesJSONString);
    createPropertiesList(myProperties)
}
let currentProperty = {};
    document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnAddProperty').addEventListener('click', addProperty);
    document.getElementById('btnSaveProperty').addEventListener('click', saveProperty);
    document.getElementById('btnDeleteProperty').addEventListener('click', deleteProperty);
    document.getElementById('btnAddPropertyCollapser').addEventListener('click', collapseForm);
});

    // allows for a button marked with class 'collapsible'
// to collapse/uncollapse immediate siblings if content is initially hidden in CSS.
function collapseForm() {
    if (this.nextElementSibling.nextElementSibling.style.display === "block" && this.nextElementSibling.nextElementSibling.id == "propertyForm") {
        this.nextElementSibling.nextElementSibling.style.display = "none";
    }
    else if (this.nextElementSibling.nextElementSibling.id == "propertyForm"){
        this.nextElementSibling.nextElementSibling.style.display = "block";
    }
};

// halting default action and saving each field into an object.
function addProperty() {
    event.preventDefault();
    currentProperty = {
        name: document.getElementById('propertyForm').elements.propertyName.value,
        value: document.getElementById('propertyForm').elements.propertyValue.value,
        offer: document.getElementById('propertyForm').elements.propertyOffer.value,
        status: document.getElementById('propertyForm').elements.propertyStatus.value,
        date: document.getElementById('propertyForm').elements.propertyDate.value,
        address: document.getElementById('propertyForm').elements.propertyAddress.value,
        notes: document.getElementById('propertyForm').elements.propertyNotes.value,
    };
    // adding this object to the overall array
    console.log(currentProperty);
    myProperties.push(currentProperty);
    
    // adding to list of properties on page
        let formClone = document.getElementById('propertyDisplayItem').cloneNode(true)
        let currentPropertyId = (myProperties.length - 1).toString();
        let propertyFormId = 'propertyDisplay' + currentPropertyId;
        formClone.id = propertyFormId;
        console.log(formClone.id);

    // alerting user of addition and clearing the form
    alert("Property added: " + currentProperty.name + ".");
    document.getElementById('propertyForm').reset();
    
    // updating/replacing the localStorage version.
    updateProperties();
   
    deleteDisplayList(-1);
    createPropertiesList(myProperties);

    // collapse the Property form
    document.getElementById('btnAddPropertyCollapser').nextElementSibling.nextElementSibling.style.display = "none";
}

function updateProperties(){
    propertiesJSONString = JSON.stringify(myProperties);
    localStorage.setItem("properties", propertiesJSONString);
}


// generates the ul of properties from the myProperties array.
function createPropertiesList(array) {
    sortArray(array);
    // create one form per array entry
    // populate it from each entry as well
    for (i = 0; i < array.length; i++) {
        // clone form and give it an Id
            let formClone = document.getElementById('propertyDisplayItem').cloneNode(true)
            let propertyFormId = 'propertyDisplay' + i.toString();
            formClone.id = propertyFormId;
        // update its fields according to its Id
            formClone.childNodes[1].propertyName.value = myProperties[i].name;
            formClone.childNodes[1].propertyValue.value = myProperties[i].value;
            formClone.childNodes[1].propertyOffer.value = myProperties[i].offer;
            formClone.childNodes[1].propertyStatus.value = myProperties[i].status;
            formClone.childNodes[1].propertyDate.value = myProperties[i].date;
            formClone.childNodes[1].propertyAddress.value = myProperties[i].address;
            formClone.childNodes[1].propertyNotes.value = myProperties[i].notes;
            formClone.childNodes[1][7].addEventListener('click', saveProperty);
            formClone.childNodes[1][8].addEventListener('click', deleteProperty);
        // append it to the ul
            formClone.style.display = "block";
            document.getElementById('propertyDisplayList').appendChild(formClone);
    };
}

function getPropertyId(element){
    let propertyFormId = element.parentNode.parentNode.id;
    let myPropertyId = parseInt(propertyFormId.substring(15));
    return myPropertyId;
}

function saveProperty(){
    event.preventDefault();
    let myPropertyId = getPropertyId(this);
    // search myProperties and overwrite entry with same name with entry's stuff.
        myProperties[myPropertyId].name = this.parentNode.propertyName.value;
        myProperties[myPropertyId].value = this.parentNode.propertyValue.value;
        myProperties[myPropertyId].offer = this.parentNode.propertyOffer.value;
        myProperties[myPropertyId].status = this.parentNode.propertyStatus.value;
        myProperties[myPropertyId].date = this.parentNode.propertyDate.value;
        myProperties[myPropertyId].address = this.parentNode.propertyAddress.value;
        myProperties[myPropertyId].notes = this.parentNode.propertyNotes.value;

    // update localStorage version
    updateProperties();

    sortDisplay();
}

function deleteProperty(){
    event.preventDefault();
    let myPropertyId = getPropertyId(this);
    
    // search myProperties for this node's name and remove that key/value pair
    myProperties.splice(myPropertyId, 1);
    
    // update localStorage
    updateProperties();

    // recreate property list
    deleteDisplayList(1);
    createPropertiesList(myProperties);
}

// 'adjustment' is to allow you to delete more or fewer items than currently exists within the object.
function deleteDisplayList(adjustment){
    let objLength = myProperties.length + adjustment;
    for (i = 0; i < objLength; i++){
        document.getElementById('propertyDisplay' + i.toString()).remove();
    }
}

function sortArray(array){
    array.sort((a,b) => {
        if (a.name > b.name){
            return 1;
        }
        else{
            return -1;
        }
    })
}

function sortDisplay(){
    deleteDisplayList(0);
    createPropertiesList(myProperties);
}