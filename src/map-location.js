
export class GeoMapLocation extends HTMLElement {
  connectedCallback(){
    this.geo_map = this.closest('geo-map')
    if(this.geo_map === null){
      this.innerHTML = '<h1>This component requires a geo map container</h1>'
    }

    this.geo_map.addEventListener('INITIALIZED', () => this.initialize())

   


  }

  initialize(){
    this.innerHTML = 'map-location'
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

customElements.define('map-location', GeoMapLocation)


