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
        formClone.firstChild.nextElementSibling.contactPhone.value = myContacts[currentContactId].phone;
        formClone.firstChild.nextElementSibling.contactEmail.value = myContacts[currentContactId].email;
        formClone.firstChild.nextElementSibling.contactAddress.value = myContacts[currentContactId].address;
        formClone.firstChild.nextElementSibling.contactNotes.value = myContacts[currentContactId].notes;
        formClone.firstElementChild[5].addEventListener('click', saveContact);
        formClone.firstElementChild[6].addEventListener('click', deleteContact);
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
    for (i = 1; i < array.length; i++) {
        // clone form and give it an Id
        let formClone = document.getElementById('contactDisplayItem').cloneNode(true)
        let contactFormId = 'contactDisplay' + i.toString();
        formClone.id = contactFormId;
    // update its fields according to its Id
        formClone.firstChild.nextElementSibling.contactName.value = myContacts[i].name;
        formClone.firstChild.nextElementSibling.contactPhone.value = myContacts[i].phone;
        formClone.firstChild.nextElementSibling.contactEmail.value = myContacts[i].email;
        formClone.firstChild.nextElementSibling.contactAddress.value = myContacts[i].address;
        formClone.firstChild.nextElementSibling.contactNotes.value = myContacts[i].notes;
        formClone.firstElementChild[5].addEventListener('click', saveContact);
        formClone.firstElementChild[6].addEventListener('click', deleteContact);
    // append it to the ul
        document.getElementById('contactDisplayList').appendChild(formClone);

    }     

    // once all other forms are set, modify id0
    document.getElementById('contactDisplayForm').contactName.value = myContacts[0].name;
    document.getElementById('contactDisplayForm').contactPhone.value = myContacts[0].phone;
    document.getElementById('contactDisplayForm').contactEmail.value = myContacts[0].email;
    document.getElementById('contactDisplayForm').contactAddress.value = myContacts[0].address;
    document.getElementById('contactDisplayForm').contactNotes.value = myContacts[0].notes;
}

function saveContact(){
    event.preventDefault();
    // search myContacts and overwrite entry with same name with entry's stuff.
    for (i = 0; i < myContacts.length; i++){
        if (myContacts[i].name == this.parentNode.contactName.value){
            myContacts[i].phone = this.parentNode.contactPhone.value;
            myContacts[i].email = this.parentNode.contactEmail.value;
            myContacts[i].address = this.parentNode.contactAddress.value;
            myContacts[i].notes = this.parentNode.contactNotes.value;
        }
    }

    // update localStorage version
    updateContacts();
}

function deleteContact(){
    event.preventDefault();
    
    // search myContacts for this node's name and remove that key/value pair
    for (i = 0; i < myContacts.length; i++){
        if (myContacts[i].name == this.parentNode.contactName.value){
        myContacts.splice(i, 1);
        }
    }
    
    // remove this entry from the ul
    this.parentNode.parentNode.remove();
    
    // update localStorage
    updateContacts();
}