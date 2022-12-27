class GeoMapModal extends HTMLElement {
  connectedCallback(){
    const hidden = this.getAttribute('hidden');
    if(hidden !== null){this.hideModal()}
    const close_button = document.createElement('span');
    close_button.innerText = 'x';
    close_button.classList.add('close-button');
    close_button.addEventListener('click', (e) => {
      this.hideModal()
    });
    this.appendChild(close_button);
    this.style.transition = 'opacity 0.5s ease-out';
    this.open_modal_div = document.querySelector('geo-map-show-modal');
    this.open_modal_div.style.opacity = 0;

  }

  hideModal(){
    this.style.opacity = 0;
    setTimeout((e)=>{
      this.style.display = 'none';
    }, 600);
    this.open_modal_div = document.querySelector('geo-map-show-modal');
    this.open_modal_div.style.opacity = 1;
  }

  showModal(){
    this.style.opacity = 1;
    this.style.display = 'flex';
    this.open_modal_div = document.querySelector('geo-map-show-modal');
    this.open_modal_div.style.opacity = 0;
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
      default:
    }
  }
}

customElements.define('geo-map-modal', GeoMapModal)

class GeoMapShowModal extends HTMLElement {
  connectedCallback(){
    this.addEventListener('click', function(){
      document.querySelector('geo-map-modal').showModal();

    })
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
      default:
    }
  }

}

customElements.define('geo-map-show-modal', GeoMapShowModal)


