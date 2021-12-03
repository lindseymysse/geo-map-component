export default class MapData extends HTMLElement {
  connectedCallback(){
    this.geo_map = this.closest('geo-map')
    this.innerHTML = '<h1>Found Parent Geo Map</h1>'
    if(this.geo_map === null){
      this.innerHTML = '<h1>This component requires a geo map container</h1>'
    }
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

customElements.define('geo-data', GeoMapData)


