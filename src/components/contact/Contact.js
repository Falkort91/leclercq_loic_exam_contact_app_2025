import getTemplate from './templates';

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
  }
}