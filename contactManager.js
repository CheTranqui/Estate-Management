// myContacts is an array of objects.
// currentContact is an object that contains a contact's information.
// initially, we're creating these objects and prepopulating myContacts.
let myContacts = [];
if (localStorage["contacts"] != undefined  && localStorage["contacts"][0] != undefined) {
    startingContactsJSONString = localStorage.getItem("contacts");
    myContacts = JSON.parse(startingContactsJSONString);
    createContactsList(myContacts)
}
let currentContact = {};

// setting this event listener for when the Save Contact button is clicked.
    document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnAddContact').addEventListener('click', addContact);
    document.getElementById('btnSaveContact').addEventListener('click', saveContact);
    document.getElementById('btnDeleteContact').addEventListener('click', deleteContact);
});


// halting default action and saving each field into an object.
function addContact() {
    event.preventDefault();
    currentContact = {
        name: document.getElementById('contactForm').elements.contactName.value,
        role: document.getElementById('contactForm').elements.contactRole.value,
        phone: document.getElementById('contactForm').elements.contactPhone.value,
        email: document.getElementById('contactForm').elements.contactEmail.value,
        address: document.getElementById('contactForm').elements.contactAddress.value,
        notes: document.getElementById('contactForm').elements.contactNotes.value,
    };
    // adding this object to the overall array
    console.log(currentContact);
    myContacts.push(currentContact);
    
    // addint to list of contacts on page
    let formClone = document.getElementById('contactDisplayItem').cloneNode(true)
        let currentContactId = (myContacts.length - 1).toString();
        let contactFormId = 'contactDisplay' + currentContactId;
        formClone.id = contactFormId;
        console.log(formClone.id);
    // update its fields according to its Id
        formClone.firstChild.nextElementSibling.contactName.value = myContacts[currentContactId].name;
        formClone.firstChild.nextElementSibling.contactRole.value = myContacts[currentContactId].role;
        formClone.firstChild.nextElementSibling.contactPhone.value = myContacts[currentContactId].phone;
        formClone.firstChild.nextElementSibling.contactEmail.value = myContacts[currentContactId].email;
        formClone.firstChild.nextElementSibling.contactAddress.value = myContacts[currentContactId].address;
        formClone.firstChild.nextElementSibling.contactNotes.value = myContacts[currentContactId].notes;
        formClone.firstElementChild[6].addEventListener('click', saveContact);
        formClone.firstElementChild[7].addEventListener('click', deleteContact);
        formClone.style.display = "block";
        document.getElementById('contactDisplayList').appendChild(formClone);
    // alerting user of addition and clearing the form
    alert("Contact added: " + currentContact.name + ".");
    document.getElementById('contactForm').reset();
    
    // updating/replacing the localStorage version.
    updateContacts();
   
    // collapse the Contact form
    document.getElementById('btnAddContactCollapser').nextElementSibling.style.display = "none";
}

function updateContacts(){
    contactsJSONString = JSON.stringify(myContacts);
    localStorage.setItem("contacts", contactsJSONString);
}


// allows for a button marked with class 'collapsible'
// to collapse/uncollapse immediate siblings if content is initially hidden in CSS.
const myCollapsible = document.getElementsByClassName("collapsible");
for (i = 0; i < myCollapsible.length; i++) {
    myCollapsible[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

// generates the ul of contacts from the myContacts array.
function createContactsList(array) {
    // create one form per array entry
    // populate it from each entry as well
    for (i = 0; i < array.length; i++) {
        // clone form and give it an Id
        let formClone = document.getElementById('contactDisplayItem').cloneNode(true)
        let contactFormId = 'contactDisplay' + i.toString();
        formClone.id = contactFormId;
    // update its fields according to its Id
        formClone.firstChild.nextElementSibling.contactName.value = myContacts[i].name;
        formClone.firstChild.nextElementSibling.contactRole.value = myContacts[i].role;
        formClone.firstChild.nextElementSibling.contactPhone.value = myContacts[i].phone;
        formClone.firstChild.nextElementSibling.contactEmail.value = myContacts[i].email;
        formClone.firstChild.nextElementSibling.contactAddress.value = myContacts[i].address;
        formClone.firstChild.nextElementSibling.contactNotes.value = myContacts[i].notes;
        formClone.firstElementChild[6].addEventListener('click', saveContact);
        formClone.firstElementChild[7].addEventListener('click', deleteContact);
        formClone.style.display = "block";
    // append it to the ul
        document.getElementById('contactDisplayList').appendChild(formClone);

    }
}

function getContactId(element){
    let contactFormId = element.parentNode.parentNode.id
    let myContactId = parseInt(contactFormId.substring(14));
    return myContactId;
}

function saveContact(){
    event.preventDefault();
    let myContactId = getContactId(this);
    // search myContacts and overwrite entry with same name with entry's stuff.
    myContacts[myContactId].name = this.parentNode.contactName.value;
    myContacts[myContactId].role = this.parentNode.contactRole.value;
    myContacts[myContactId].phone = this.parentNode.contactPhone.value;
    myContacts[myContactId].email = this.parentNode.contactEmail.value;
    myContacts[myContactId].address = this.parentNode.contactAddress.value;
    myContacts[myContactId].notes = this.parentNode.contactNotes.value;
        
    // update localStorage version
    updateContacts();
}

function deleteContact(){
    event.preventDefault();
    let myContactId = getContactId(this);

    // search myContacts for this node's name and remove that key/value pair
    myContacts.splice(myContactId, 1);
    
    // update localStorage
    updateContacts();    

    //recreate contacts list
    deleteContactsList();
    createContactsList(myContacts);
}

function deleteContactsList(){
    let objLength = myContacts.length + 1;
    // remove this entry from the ul
    for (i=0; i < objLength; i++){
        document.getElementById('contactDisplay' + i.toString()).remove();
    }    
}