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
    // update its fields according to its Id
        formClone.childNodes[1].propertyName.value = myProperties[currentPropertyId].name;
        formClone.childNodes[1].propertyValue.value = myProperties[currentPropertyId].value;
        formClone.childNodes[1].propertyOffer.value = myProperties[currentPropertyId].offer;
        formClone.childNodes[1].propertyStatus.value = myProperties[currentPropertyId].status;
        formClone.childNodes[1].propertyDate.value = myProperties[currentPropertyId].date;
        formClone.childNodes[1].propertyAddress.value = myProperties[currentPropertyId].address;
        formClone.childNodes[1].propertyNotes.value = myProperties[currentPropertyId].notes;
        formClone.childNodes[1].childNodes[7].addEventListener('click', saveProperty);
        formClone.childNodes[1].childNodes[8].addEventListener('click', deleteProperty);
        document.getElementById('propertyDisplayList').appendChild(formClone);
    // alerting user of addition and clearing the form
    alert("Property added: " + currentProperty.name + ".");
    document.getElementById('propertyForm').reset();
    
    // updating/replacing the localStorage version.
    updateProperties();
   
    // collapse the Property form
    document.getElementById('btnAddPropertyCollapser').nextElementSibling.nextElementSibling.style.display = "none";
}

function updateProperties(){
    propertiesJSONString = JSON.stringify(myProperties);
    localStorage.setItem("properties", propertiesJSONString);
}


// generates the ul of properties from the myProperties array.
function createPropertiesList(array) {
    // create one form per array entry
    // populate it from each entry as well
    if (array.length > 1) {
        for (i = 1; i < array.length; i++) {
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
            formClone.childNodes[1].childNodes[7].addEventListener('click', saveProperty);
            formClone.childNodes[1].childNodes[8].addEventListener('click', deleteProperty);
        // append it to the ul
            document.getElementById('propertyDisplayList').appendChild(formClone);
        };
    }
    // once all other forms are set, modify id0
    if (array.length != 0) {
        document.getElementById('propertyDisplayForm').propertyName.value = myProperties[0].name;
        document.getElementById('propertyDisplayForm').propertyValue.value = myProperties[0].value;
        document.getElementById('propertyDisplayForm').propertyOffer.value = myProperties[0].offer;
        document.getElementById('propertyDisplayForm').propertyStatus.value = myProperties[0].status;
        document.getElementById('propertyDisplayForm').propertyDate.value = myProperties[0].date;
        document.getElementById('propertyDisplayForm').propertyAddress.value = myProperties[0].address;
        document.getElementById('propertyDisplayForm').propertyNotes.value = myProperties[0].notes;
    }
}

function saveProperty(){
    event.preventDefault();
    // search myProperties and overwrite entry with same name with entry's stuff.
    for (i = 0; i < myProperties.length; i++){
        if (myProperties[i].name == this.parentNode.propertyName.value){
            myProperties[i].value = this.parentNode.propertyValue.value;
            myProperties[i].offer = this.parentNode.propertyOffer.value;
            myProperties[i].status = this.parentNode.propertyStatus.value;
            myProperties[i].date = this.parentNode.propertyDate.value;
            myProperties[i].address = this.parentNode.propertyAddress.value;
            myProperties[i].notes = this.parentNode.propertyNotes.value;
        }
    }

    // update localStorage version
    updateProperties();
}

function deleteProperty(){
    event.preventDefault();
    
    // search myProperties for this node's name and remove that key/value pair
    for (i = 0; i < myProperties.length; i++){
        if (myProperties[i].name == this.parentNode.propertyName.value) {
        myProperties.splice(i, 1);
        }
    }
    
    // remove this entry from the ul
    this.parentNode.remove();
    
    // update localStorage
    updateProperties();
}