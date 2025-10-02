import getTemplate from './templates';

export default class Contact{
  constructor(data){
    this.id=data.id;
    this.firstname=data.firstname;
    this.lastname=data.lastname;
    this.email=data.email;
    this.createdAt=data.createdAt;
  }
  render(el){
    const template = document.createElement('div');
    template.innerHTML = getTemplate(this);
    el.append(template);
  }
}