class DB{
  //2. Recupération de l'url via le data
  static setApiURL(data){
    this.apiURL = data;
  }
  static async findAll(){
    //3. on peut utiliser apiURL grâce à setApiURL
    const response = await fetch(this.apiURL + "contacts");
    return response.json();
  }
}

function getContactTemplate(contact){
  return `
    <li>${contact.firstname} / ${contact.lastname} / ${contact.email}</li>
    `;
}

class Contact{
  constructor(data){
    this.id=data.id;
    this.firstname=data.firstname;
    this.lastname=data.lastname;
    this.email=data.email;
    this.createdAt=data.createdAt;
  }
  render(el){
    const template = document.createElement('div');
    template.innerHTML = getContactTemplate(this);
    el.append(template);
  }
}

function getContactListTemplate(){
  return `
     <h1> Contact List</h1>
     <ul class=contact-list></ul>
     <p>MA super liste de contact</p>
     `
}

class ContactList{
  constructor(data){
    // Permet de prendre le focus sur #app via data.el et le el de new ContactList
    this.domElt=document.querySelector(data.el);
    // 1. La fonction setApiURL vas récupérer apiURL à travers data
    DB.setApiURL(data.apiURL);
    //On initialise les contacts sur un tableau vide
    this.contacts =[];
    //On charge les contacts
    this.loadContacts();
  }
  async loadContacts(){
    const contacts= await DB.findAll();
    this.contacts=contacts.map(contact => new Contact(contact));
    this.render();
  }
  render(){
     this.domElt.innerHTML = getContactListTemplate();
     this.contacts.forEach(contact => contact.render(this.domElt.querySelector(".contact-list")));
  }
}



new ContactList({
  el:"#app",
  apiURL:"https://68dd1ef87cd1948060ac7fc2.mockapi.io/"
});