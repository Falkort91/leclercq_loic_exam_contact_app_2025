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
  render(){
     this.domElt.innerHTML = getTemplate();
     this.contacts.forEach(contact => contact.render(this.domElt.querySelector(".contact-list")));
  }
}