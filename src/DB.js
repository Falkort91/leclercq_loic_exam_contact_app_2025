export default class DB{
  //2. Recupération de l'url via le data
  static setApiURL(data){
    this.apiURL = data;
  }
  static async findAll(){
    //3. on peut utiliser apiURL grâce à setApiURL
    const response = await fetch(this.apiURL + "contacts");
    return response.json();
  }
  static async create (formFirstname,formLastname, formemail){
    const response = await fetch(this.apiURL + "contacts",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        firstname: formFirstname,
        lastname: formLastname,
        email: formemail
      })
    });
    return response.json();
  }

    static async updateOne(contact){
    const response = await fetch(this.apiURL + "contacts/" + contact.id,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        firstname: contact.firstname,
        lastname: contact.lastname,
        email: contact.email
      })
    });
    return response.json();
  }
  
  static async deleteOneById(id){
    const response = await fetch(this.apiURL+"contacts/"+id,{
      method:"DELETE"
    });
    return response.json();
  }
}