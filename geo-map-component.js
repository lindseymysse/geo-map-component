



class GeoMapComponent extends HTMLElement {
  connectedCallback(){
    this.attrs = this.getAttributeNames().reduce((acc, name) => {
      return {...acc, [name]: this.getAttribute(name)};
    }, {});


    const required_attributes = ['blah', 'blah-1', 'blah-2'];

    required_attributes.forEach(attribute => {
      if(typeof this.attrs[attribute] === 'undefined'){
        return console.error(`The attribute ${attribute} is required;`)
      }
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

customElements.define('geo-map', GeoMapComponent)


