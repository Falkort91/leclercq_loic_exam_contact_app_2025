import getTemplate from './templates';
import DB from '../../DB';

export default class Contact{
  constructor(data){
    this.id=data.id;
    this.firstname=data.firstname;
    this.lastname=data.lastname;
    this.email=data.email;
    this.createdAt=data.createdAt;
    this.domElt=null;
  }
  render(el){
    const template = document.createElement('template');
    template.innerHTML = getTemplate(this);
    this.domElt=template.content.firstElementChild;
    el.append(this.domElt);
    this.initEvent();
  }

  async update(inputFirstname,inputLastname,inputEmail){
    this.firstname = inputFirstname;
    this.lastname = inputLastname;
    this.email = inputEmail;

    this.domElt.querySelector(".update-firstname").innerText = this.firstname;
    this.domElt.querySelector(".update-lastname").innerText = this.lastname;
    this.domElt.querySelector(".update-email").innerText = this.email;

    this.domElt.classList.remove("isEditing");
    
    return await DB.updateOne(this);
  }

  initEvent(){

    this.domElt.querySelector(".btn-delete").addEventListener("click",(e) => {
      window.Contactlist.deleteOneById(this.id);
    });

    this.domElt.querySelector(".btn-edit").addEventListener("click",(e) => {
      this.domElt.classList.add("isEditing");
    });

    this.domElt.querySelector(".btn-check").addEventListener("click",(e) => {
      this.update(this.domElt.querySelector(".input-firstname").value, 
      this.domElt.querySelector(".input-lastname").value, 
      this.domElt.querySelector(".input-email").value)
    });
  }
}