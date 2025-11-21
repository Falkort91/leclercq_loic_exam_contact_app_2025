(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();class o{static setApiURL(t){this.apiURL=t}static async findAll(){return(await fetch(this.apiURL+"contacts")).json()}static async create(t,e,n){return(await fetch(this.apiURL+"contacts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstname:t,lastname:e,email:n})})).json()}static async updateOne(t){return(await fetch(this.apiURL+"contacts/"+t.id,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstname:t.firstname,lastname:t.lastname,email:t.email})})).json()}static async deleteOneById(t){return(await fetch(this.apiURL+"contacts/"+t,{method:"DELETE"})).json()}}function d(a){return`
          <tr data-id="${a.id}" class="contact-row">
              <td class="p-4">
                <span class="update-firstname isEditing-hidden">${a.firstname}</span>
                <input
                  type="text"
                  class="input-firstname isEditing-visible w-full mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value="${a.firstname}"
                />
              </td>
              <td class="p-4">
                <span class="update-lastname isEditing-hidden">${a.lastname}</span>
                <input
                  type="text"
                  class="input-lastname isEditing-visible w-full mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value="${a.lastname}"
                />
              </td>
              <td class="p-4">
                <span class="update-email isEditing-hidden">${a.email}</span>
                <input
                  type="text"
                  class="input-email isEditing-visible w-full mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value="${a.email}"
                />
              </td>
              <td class="p-4">
                <div class="flex justify-end space-x-2">
                  <button
                    class="btn-check isEditing-visible bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-md"
                  >
                    <i class="fa-solid fa-check"></i>
                  </button>
                  <button
                    class="btn-edit isEditing-hidden bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-md"
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    class="btn-delete isEditing-hidden bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>    
    `}class l{constructor(t){this.id=t.id,this.firstname=t.firstname,this.lastname=t.lastname,this.email=t.email,this.createdAt=t.createdAt,this.domElt=null}render(t){const e=document.createElement("template");e.innerHTML=d(this),this.domElt=e.content.firstElementChild,t.append(this.domElt),this.initEvent()}async update(t,e,n){return this.firstname=t,this.lastname=e,this.email=n,this.domElt.querySelector(".update-firstname").innerText=this.firstname,this.domElt.querySelector(".update-lastname").innerText=this.lastname,this.domElt.querySelector(".update-email").innerText=this.email,this.domElt.classList.remove("isEditing"),await o.updateOne(this)}initEvent(){this.domElt.querySelector(".btn-delete").addEventListener("click",t=>{window.Contactlist.deleteOneById(this.id)}),this.domElt.querySelector(".btn-edit").addEventListener("click",t=>{this.domElt.classList.add("isEditing")}),this.domElt.querySelector(".btn-check").addEventListener("click",t=>{this.update(this.domElt.querySelector(".input-firstname").value,this.domElt.querySelector(".input-lastname").value,this.domElt.querySelector(".input-email").value)})}}function c(){return`
              <!-- Aside gauche pour le formulaire -->
      <aside class="w-1/3 bg-gray-200 p-6 pb-12">
        <h2 class="text-xl font-bold mb-4">Add a Contact</h2>
        <div class="mb-4">
          <label class="block text-gray-700">Firstname</label>
          <input
            type="text"
            class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm form-firstname"
            placeholder="Alex"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Lastname</label>
          <input
            type="text"
            class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm form-lastname"
            placeholder="Doe"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input
            type="email"
            class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm form-email"
            placeholder="alex.doe@gmail.com"
          />
        </div>
        <button
          class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md add-button">
          Add
        </button>
      </aside>

      <!-- Section droite pour la liste des contacts -->
      <section class="w-2/3 p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold mb-4">Contacts List</h2>
          <p class="text-gray-600 mb-4">
            Contacts Count : <span class="font-bold"><strong class="contact-count">x</strong> Contacts</span>
          </p>
        </div>

        <!-- Filtre de recherche -->
        <div class="mb-4">
          <input
            type="text"
            class="search-filter mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search a contact"
          />
        </div>

        <!-- Liste des contacts triée et filtrée -->
        <table class="table-auto w-full contacts-table">
          <thead>
            <tr class="bg-gray-200">
              <th class=" filter-firstname text-left p-4 rounded-tl-lg">
                <a href="#">Firstname</a>
              </th>
              <th class="filter-lastname text-left p-4">
                <a href="#">Lastname</a>
              </th>
              <th class="filter-email text-left p-4">
                <a href="#">Email</a>
              </th>
              <th class="text-right p-4 rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody class="contact-list">
            
            
          </tbody>
        </table>
      </section>

      <footer class="w-full bg-gray-500 text-white text-xs p-2">
        &copy; EAFC 2025 Contacts App. All rights reserved.
      </footer>
     `}class m{constructor(t){this.domElt=document.querySelector(t.elt),o.setApiURL(t.apiURL),this.contacts=[],this.loadContacts()}async loadContacts(){const t=await o.findAll();this.contacts=t.map(e=>new l(e)),this.render()}renderContactleftcount(){this.domElt.querySelector(".contact-count").innerText=this.contacts.length}render(){this.domElt.innerHTML=c(),this.contacts.forEach(t=>t.render(this.domElt.querySelector(".contact-list"))),this.renderContactleftcount(),this.initEvent()}async deleteOneById(t){await o.deleteOneById(t),this.contacts.splice(this.contacts.findIndex(e=>e.id==t),1),this.domElt.querySelector(`[data-id="${t}"]`).remove(),this.renderContactleftcount()}initEvent(){this.domElt.querySelector(".add-button").addEventListener("click",()=>{this.addContact(this.domElt.querySelector(".form-firstname").value,this.domElt.querySelector(".form-lastname").value,this.domElt.querySelector(".form-email").value),this.resetInput()}),this.domElt.querySelector(".search-filter").addEventListener("input",t=>{this.searchFilter(t)}),this.domElt.querySelector(".filter-firstname").addEventListener("click",()=>{this.filterByFirstname()}),this.domElt.querySelector(".filter-lastname").addEventListener("click",()=>{this.filterByLastname()}),this.domElt.querySelector(".filter-email").addEventListener("click",()=>{this.filterByEmail()})}searchFilter(t){const e=t.target.value.toLowerCase(),n=this.contacts.filter(s=>s.firstname.toLowerCase().includes(e)||s.lastname.toLowerCase().includes(e)||s.email.toLowerCase().includes(e));this.domElt.querySelector(".contact-list").innerHTML="",n.forEach(s=>s.render(this.domElt.querySelector(".contact-list")))}filterByFirstname(){this.contacts.sort((t,e)=>t.firstname.localeCompare(e.firstname)),this.render()}filterByLastname(){this.contacts.sort((t,e)=>t.lastname.localeCompare(e.lastname)),this.render()}filterByEmail(){this.contacts.sort((t,e)=>t.email.localeCompare(e.email)),this.render()}resetInput(){this.domElt.querySelector(".form-firstname").value="",this.domElt.querySelector(".form-lastname").value="",this.domElt.querySelector(".form-email").value=""}async addContact(t,e,n){const s=await o.create(t,e,n),i=new l(s);this.contacts.push(i),i.render(this.domElt.querySelector(".contact-list")),this.renderContactleftcount()}}window.Contactlist=new m({elt:"#app",apiURL:"https://68dd1ef87cd1948060ac7fc2.mockapi.io/"});
