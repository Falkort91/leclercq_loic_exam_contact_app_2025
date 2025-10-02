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
}