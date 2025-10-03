import DB from '../../DB';
import Contact from '../contact/Contact';
import getTemplate from './templates';

export default class ContactList{
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
  /* getContactsLeftcount(){
    return this.contacts.length;
  } */
  renderContactleftcount(){
    this.domElt.querySelector(".contact-count").innerText = this.contacts.length;
  }
  render(){
     this.domElt.innerHTML = getTemplate();
     this.contacts.forEach(contact => contact.render(this.domElt.querySelector(".contact-list")));
     this.renderContactleftcount();
     this.initEvent();
  }

  async deleteOneById(id){
    // Supprimer de la DB
    const response = await DB.deleteOneById(id);
    //Supprimer des contacts
    this.contacts.splice(this.contacts.findIndex(contact => contact.id == id),1);
    //Supprimer du DOM
    this.domElt.querySelector(`[data-id="${id}"]`).remove();
    //Relancer le renderContactsLeftCount
    this.renderContactleftcount();
  }

  initEvent(){
    this.domElt.querySelector(".add-button").addEventListener("click", () => {this.addContact(this.domElt.querySelector(".form-firstname").value, this.domElt.querySelector(".form-lastname").value, this.domElt.querySelector(".form-email").value);
    this.resetInput();
    });
    
  }
  resetInput(){
    this.domElt.querySelector(".form-firstname").value="";
    this.domElt.querySelector(".form-lastname").value="";
    this.domElt.querySelector(".form-email").value="";
  }

  async addContact(formFirstname,formLastname, formemail){
    //Ajout dans la DB
    const contact = await DB.create(formFirstname,formLastname, formemail);
    //Création d'un objet contact
    const newContact = new Contact(contact);
    //Ajout dans le tableau contacts de contactList
    this.contacts.push(newContact);
    //Ajout dans le dom
    newContact.render(this.domElt.querySelector(".contact-list"));
    //M.A.J de nombre de contact
    this.renderContactleftcount();
  }

  
}
