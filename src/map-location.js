import {default_marker_markup, GeoMapMarker} from './map-marker.js'

export class GeoMapLocation extends HTMLElement {
  connectedCallback(){
    this.latitude = this.getAttribute('latitude')
    if(this.latitude === null){
      const latitude_error = `
        Error: Story Locations require a latitude value. 
        Please consult the readme for more information`
      console.error(latitude_error)
      return new Error(latitude_error)
    }

    this.longitude = this.getAttribute('longitude')
    if(this.longitude === null){
      const longitude_error = `
      Error: Story Locations require a longitude value. 
        Please consult the readme for more information`
        console.error(longitude_error)
      return new Error(longitude_error)
    }

    this.zoom = this.getAttribute('zoom')
    if(this.zoom === null){
      const zoom_error = `Error: Story Locations require a zoom value. 
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

    this.markers = [...this.querySelectorAll('map-marker')]
    if(this.markers.length < 1){
      const default_marker = document.createElement('map-marker')
      default_marker.innerHTML = default_marker_markup
      this.markers = [default_marker]
    }

    this.geo_map = this.closest('geo-map')
    if(this.geo_map === null){
      this.innerHTML = '<h1>This component requires a geo map container</h1>'
    }

    this.geo_map.addEventListener('INITIALIZED', () => this.initialize())
  }

  initialize(){
    this.markers.forEach(marker => {
      marker.initialize(this.geo_map.map, [this.longitude, this.latitude])
    })

  }

  static get observedAttributes() {
    return ['latitude','longitude'];
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
      case "latitude":
        this.latitude = new_value
        break
      case "longitude":
        this.longitude = new_value
        break
        break
      default:
        console.warn('do not know how to handle a change in attribute', name)
    }

    if(this.markers){
      this.markers.forEach(marker => {
        marker.setLngLat([this.longitude, this.latitude])
      }) 
    }
  }
}

customElements.define('map-location', GeoMapLocation)

