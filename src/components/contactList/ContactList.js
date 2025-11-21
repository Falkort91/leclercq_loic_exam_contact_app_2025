import DB from '../../DB';
import Contact from '../contact/Contact';
import getTemplate from './templates';

export default class ContactList{
  constructor(data){
    // Permet de prendre le focus sur #app via data.el et le el de new ContactList
    this.domElt=document.querySelector(data.elt);
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
    this.domElt.querySelector(".add-button").addEventListener("click", () => {
      this.addContact(this.domElt.querySelector(".form-firstname").value, 
      this.domElt.querySelector(".form-lastname").value, 
      this.domElt.querySelector(".form-email").value);
      // On vide les inputs après avoir add le contact (clic sur le add button)
      this.resetInput();
    });
    //On cible l'input search-filter et on écoute l'input (il suivra l'évolution de ce qui est écrit dans l'input) via la fonction searchFilter
    this.domElt.querySelector(".search-filter").addEventListener("input",(e)=>{this.searchFilter(e)});

    //On cible le span du firstname et on sur un clic on trie par ordre alpha les firstname
    this.domElt.querySelector(".filter-firstname").addEventListener("click",() => {this.filterByFirstname()});
    //On cible le span du lastname et on sur un clic on trie par ordre alpha les lastname
    this.domElt.querySelector(".filter-lastname").addEventListener("click",() => {this.filterByLastname()});
    //On cible le span du email et on sur un clic on trie par ordre alpha les email
    this.domElt.querySelector(".filter-email").addEventListener("click",() => {this.filterByEmail()});
  }

  searchFilter(e){
      // On stock ce qu'il ya  dans l'input dans une constante
      const searchValue = e.target.value.toLowerCase();
      // On crée un tableau en lui imposant un filtre correspondant à la searchValue
      const filteredContacts = this.contacts.filter(contact => 
        contact.firstname.toLowerCase().includes(searchValue)||
        contact.lastname.toLowerCase().includes(searchValue)||
        contact.email.toLowerCase().includes(searchValue));
        // On vide le tableau présent au départ
      this.domElt.querySelector(".contact-list").innerHTML="";
      // On réaffiche le tableau ayant subis le filtre
      filteredContacts.forEach(contact => contact.render(this.domElt.querySelector(".contact-list")));
  }

  // Fonction Tri par Firstname
  filterByFirstname(){
    this.contacts.sort((a, b) => a.firstname.localeCompare(b.firstname));
    this.render();
  }
  // Fonction Tri par Lastname
  filterByLastname(){
    this.contacts.sort((a, b) => a.lastname.localeCompare(b.lastname));
    this.render();
  }
  // Fonction Tri par Email
  filterByEmail(){
    this.contacts.sort((a, b) => a.email.localeCompare(b.email));
    this.render();
  }

  // On remet les values des inputs à vide 
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
