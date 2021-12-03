const default_marker = document.createElement('map-marker')
default_marker.innerHTML = `
<svg width="4em" height="4em" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
 <path d="m600.09 171.43c-177.77 0-322.46 144.52-322.46 321.95 0 173.14 296.91 514.8 309.43 529.2 3.2539 3.7695 8.0547 5.9961 13.027 5.9961 4.9727 0 9.6016-2.2266 12.855-6 12.684-14.402 309.43-356.06 309.43-529.2 0-177.43-144.52-321.94-322.29-321.94zm0 490.63c-92.914 0-168.52-75.773-168.52-168.69 0-92.742 75.602-168.34 168.52-168.34 92.742 0 168.34 75.602 168.34 168.34 0 92.914-75.602 168.69-168.34 168.69z" fill="#ff814a"/>
</svg>`


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
      this.markers = [default_marker]
    }

    this.geo_map = this.closest('geo-map')
    if(this.geo_map === null){
      this.innerHTML = '<h1>This component requires a geo map container</h1>'
    }

    this.geo_map.addEventListener('INITIALIZED', () => this.initialize())
  }

  initialize(){

    this.markers = this.markers.map(marker => {
      let rotation_alignment = marker.getAttribute('alignment')
      if(rotation_alignment === null || rotation_alignment === ""){
        rotation_alignment = 'viewport'
      }

      return new mapboxgl.Marker({
        draggable: false,
        scale: 0,
        rotationAlignment: rotation_alignment,
        element:marker
      }).setLngLat([this.longitude, this.latitude])
      .addTo(this.geo_map.map)
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


