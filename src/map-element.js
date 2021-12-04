
/*

  GEO MAP ELEMENT

  this is a parent class that gives basic 
  data verification

*/



export default class GeoMapElement extends HTMLElement {
  connectedCallback(){

    this.errorCheck()
    this.geo_map = this.closest('geo-map')
    if(this.geo_map === null){
      this.innerHTML = '<h1>This component requires a geo map container</h1>'
    }

    this.geo_map.addEventListener('INITIALIZED', () => this.initialize())
    if(this.geo_map.initialized){this.initialize()}
  }

  errorCheck(){
    this.latitude = this.getAttribute('latitude')
    if(this.latitude === null){
      const latitude_error = `
        Error: GeoMapElements require a latitude value. 
        Please consult the readme for more information`
      console.error(latitude_error)
      return new Error(latitude_error)
    }

    this.longitude = this.getAttribute('longitude')
    if(this.longitude === null){
      const longitude_error = `
      Error: GeoMapElements require a longitude value. 
        Please consult the readme for more information`
        console.error(longitude_error)
      return new Error(longitude_error)
    }

    this.zoom = this.getAttribute('zoom')
    if(this.zoom === null){
      const zoom_error = `Error: GeoMapElements require a zoom value. 
        Please consult the readme for more information`
        console.error(zoom_error)
      return new Error(zoom_error)
    }

    this.bearing = this.getAttribute('bearing')
    if(this.bearing === null || this.bearing === ""){
      console.warn('Could not find bearings, using the default')
      this.bearing = 80
    }

    this.pitch = this.getAttribute('pitch')
    if(this.pitch === null || this.pitch === ""){
      console.warn('Could not find pitch, using the default')
      this.pitch = 60
    }
  }

  initialize(){

  }

  disconnectedCallback() {
    [...this.childNodes].forEach(node => node.remove())
  }

}


