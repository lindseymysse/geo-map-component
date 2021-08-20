/*

    **** BEGIN ASCII ART ****

       ________________        __  ______    ____
      / ____/ ____/ __ \      /  |/  /   |  / __ \
     / / __/ __/ / / / /_____/ /|_/ / /| | / /_/ /
    / /_/ / /___/ /_/ /_____/ /  / / ___ |/ ____/
    \____/_____/\____/     /_/  /_/_/  |_/_/


    **** END ASCII ART ****

    Markup Based Map as a pure Web Component

*/

/*

  *** begin ascii art ***

    8888b.  88 .dP"Y8 88""Yb    db    888888  dP""b8 88  88
     8I  Yb 88 `Ybo." 88__dP   dPYb     88   dP   `" 88  88
     8I  dY 88 o.`Y8b 88"""   dP__Yb    88   Yb      888888
    8888Y"  88 8bodP' 88     dP""""Yb   88    YboodP 88  88

  *** end ascii art ***


  dispatches a custom event with a detail to the application.
  

*/

function dispatch(name, detail = {}){
  const initialize_event = new CustomEvent(name, {detail: detail})
  document.dispatchEvent(initialize_event)
}


/*
  
  ROUTING
  
  Get and Set URL

*/

function getURLValues(URL = window.location.href ){
  const search_params = new URLSearchParams(URL)
  let options = {}
  for (const [key, unparsed_value] of search_params) {
    if(key !== window.location.origin + window.location.pathname + '?' ){
      try {
        const value = JSON.parse(decodeURI(unparsed_value))
        options[key] = value
      } catch {
        options[key] = decodeURI(unparsed_value)
      }
    }
  }
  return options
}

function setURLValues(obj){
  let url = window.location.origin + window.location.pathname + '?'
  Object.keys(obj).forEach(key => {
    url += `&${key}=${obj[key]}`
  })
  history.pushState(obj, '', url)
}

/*
    
    Get Attribute

    Gets all attributes of an object,
    returns an object
    
*/

function getAttributes(el){
  let obj = {}
  for (let att, i = 0, atts = el.attributes, n = atts.length; i < n; i++){
    att = atts[i]
    obj[att.nodeName] = att.nodeValue
  }
  return obj
}


function ready(callbackFunction){
  if(document.readyState != 'loading')
    callbackFunction(event)
  else
    document.addEventListener("DOMContentLoaded", callbackFunction)
}



class GeoMap extends HTMLElement {

  connectedCallback(){
    if(typeof(mapboxgl) === 'undefined'){
      this.innerHTML = '<error>STORY MAP REQUIRES MAPBOXGL TO WORK: https://docs.mapbox.com/mapbox-gl-js/api/</error>'
    }
    const URLvalues = getURLValues()
  
    this.access_token = this.getAttribute('accesstoken')
    if(this.access_token === null){
      const access_token_error = `
        Error: Story Map requires a Mapbox access token. 
        Please consult the readme for more information`
      this.innerHTML = `<error> ${access_token_error} </error>`
      return new Error(access_token_error)
    }
    this.removeAttribute('accesstoken')
    mapboxgl.accessToken = this.access_token

    this.latitude = URLvalues.latitude ? URLvalues.latitude : 0
    this.longitude = URLvalues.longitude ? URLvalues.longitude : 0
    this.zoom = URLvalues.zoom ? URLvalues.zoom : 1
    this.bearing = URLvalues.bearing ? URLvalues.bearing : 0
    this.pitch = URLvalues.pitch ? URLvalues.pitch : 0
    this.home_coord = {
      center:[this.longitude, this.latitude],
      zoom:this.zoom,
      pitch: this.pitch,
      bearing: this.bearing
    }
    this.styleurl = this.getAttribute('styleurl')
    if(this.styleurl === null || this.styleurl === ""){
      console.warn('could not find style url, using the default')
      this.styleurl = 'mapbox://styles/mapbox/streets-v11'
    }
    this.removeAttribute('styleurl')

    const el = document.createElement('div')
    el.classList.add('map-container')
    this.appendChild(el)
    this.map = new mapboxgl.Map({
      container: el, // container ID
      style: this.styleurl, // style URL
      center: [this.longitude, this.latitude],
      zoom: this.zoom,
      bearing: this.bearing,
      pitch: this.pitch,
      style: this.styleurl,
    })

    this.map.on('load', () => {this.mapLoaded()})

    this.geocoder = this.getAttribute('geocoder')
    if(this.geocoder !== null){   
      if(typeof(MapboxGeocoder) === 'undefined'){
        this.innerHTML = `If you would like to use the geocoder element, 
        you must include the geocoder plugin in your HTML: 
        https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder/`
        return
      } 
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        zoom: 18,
        marker: false,
        placeholder: 'Search for an Address'
      })
      geocoder.on('result', (e) => { this.geocoderResult(e) })
      this.map.addControl( geocoder )
    } // end GeoCoder

    this.navigation_control = this.getAttribute('navigation')
    if(this.navigation_control !== null){
      this.map.addControl(
        new mapboxgl.NavigationControl({visualizePitch: true})
      )
    }
    this.geolocate = this.getAttribute('geolocate')
    if(this.geolocate !== null){
      this.map.addControl(new mapboxgl.GeolocateControl({
        showAccuracy: false,
        showUserLocation: false
      }))
    }

    this.slideshow = this.getAttribute('slideshow')
    if(this.slideshow !== null){
      this.map.addControl(new SlideShowControls(this.map))
      document.addEventListener('NEXT SLIDE', (e) => { this.nextLocation() })
      document.addEventListener('PREV SLIDE', (e) => { this.prevLocation() })
      document.addEventListener('SHOW HOME', (e) => {
        this.selectLocation(this.querySelector('map-location'))
      })
      this.slideshow_index = 0
    }

    this.edit_mode = this.getAttribute('edit')
    if(this.edit_mode !== null){
      this.map.addControl(new EditController(this.map))
    }
   

    setInterval(()=>{this.checkForDOMUpdates()},50)

  }


  nextLocation(){
    const locations = [...this.querySelectorAll('map-location')]
    this.slideshow_index++
    if(this.slideshow_index > locations.length - 1) this.slideshow_index = 0 
    this.selectLocation(locations[this.slideshow_index])
  }

  prevLocation(){
    const locations = [...this.querySelectorAll('map-location')]
    this.slideshow_index--
    if(this.slideshow_index < 0) this.slideshow_index = locations.length  - 1
    this.selectLocation(locations[this.slideshow_index])
  }

  async checkForDOMUpdates(){
    const query = this.querySelectorAll('map-location')
    if(query.length !== this.storyLocationCount){
      this.cursor = 'wait'
      this.storyLocationCount = query.length
      await [...query].forEach(location => { const addedMarkers = this.addLocation(location) })
      this.cursor = ''
    }
  }

  addLocation(location){
    const center = [location.longitude, location.latitude]
    let markers = [...location.querySelectorAll('map-marker')]

    if(markers.length > 0){
      markers = markers.map(marker => {

        let rotation_alignment = marker.getAttribute('rotation-alignment')
        if(rotation_alignment === null){
          rotation_alignment = 'viewport'
        }

        return new mapboxgl.Marker({
          draggable:false,
          scale:0,
          rotationAlignment: rotation_alignment,
          element: marker
        }).setLngLat(center)
          .addTo(this.map)
      })
    } else {
      markers[0] = new mapboxgl.Marker({
        draggable: false,
        color: '#FFDE00',
        rotationAlignment: 'viewport',
        scale: 1,
      }).setLngLat(center)
      .addTo(this.map)
    }

    markers.forEach(marker => {
      marker.getElement().addEventListener('click', (e)=> {
        e.stopPropagation()
        this.selectLocation(location)
      })
    })
  }

  selectLocation(location){
    if(location === undefined) return
    const center = [location.longitude, location.latitude]

    this.map.flyTo({
      center,
      zoom: location.zoom,
      bearing: location.bearing,
      pitch: location.pitch
    })

    ;[...document.querySelectorAll('map-information-box')].forEach(box => box.remove())
    const info_box = document.createElement('map-information-box')
    info_box.innerHTML = location.innerHTML
    this.appendChild(info_box)
  }


  mapLoaded(){
    this.map.addSource('mapbox-dem', {
      'type': 'raster-dem',
      'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
      'tileSize': 512,
      'maxzoom': 14
    })
    this.map.setTerrain({ 'source': 'mapbox-dem' })      

    this.map.on('moveend', (e) => {
      let center  = this.map.getCenter()
      this.longitude = center.lng
      this.latitude = center.lat
      this.zoom = this.map.getZoom()
      this.bearing = this.map.getBearing()
      this.pitch = this.map.getPitch()

      setURLValues({
        latitude: this.latitude, 
        longitude: this.longitude,
        zoom: this.zoom,
        bearing: this.bearing, 
        pitch: this.pitch,
      })
    })//end moveend
  }

  geocoderResult(){
    this.map.once('moveend', async (e) => {
      console.log(e)
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

customElements.define('geo-map', GeoMap)


class MapLocation extends HTMLElement {
  connectedCallback(){
    this.latitude = this.getAttribute('latitude')
    if(this.latitude === null){
      const latitude_error = `
        Error: Story Locations require a latitude value. 
        Please consult the readme for more information`
      this.innerHTML = `<error> ${latitude_error} </error>`
      return new Error(latitude_error)
    }

    this.longitude = this.getAttribute('longitude')
    if(this.longitude === null){
      const longitude_error = `
      Error: Story Locations require a longitude value. 
        Please consult the readme for more information`
      this.innerHTML = `<error> ${longitude_error} </error>`
      return new Error(longitude_error)
    }

    this.zoom = this.getAttribute('zoom')
    if(this.zoom === null){
      const zoom_error = `Error: Story Locations require a zoom value. 
        Please consult the readme for more information`
      this.innerHTML = `<error> ${zoom_error} </error>`
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

    this.duration = this.getAttribute('duration')

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

customElements.define('map-location', MapLocation)


class EditController {
  onAdd(map) {

    this.map = map
    this._container = document.createElement('button')
    this._container.className = 'mapboxgl-ctrl'
    this._container.innerHTML = `<svg height='20px' width='20px'  fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><g><g><path d="M80.4,5.5h-2.8L66.8,16.3l17,17l10.8-10.8v-2.8L80.4,5.5z M12.8,70.3L5,95l24.7-7.8l47-47l-17-17L12.8,70.3z"></path></g></g></svg>`
    this._container.addEventListener('click', (e) => this.handleClick(e))
    return this._container;
  }

  handleClick(e){
    const center = this.map.getCenter()
    const new_marker = document.createElement('map-location')
    const location = getURLValues()
    Object.keys(location).forEach(key => {
      new_marker.setAttribute(key, location[key])
    })
    document.querySelector('geo-map').appendChild(new_marker)

    const new_story_location_markup = 

      `<map-location
        latitude="${center.lat}"
        longitude="${center.lng}"
        zoom=0
        pitch=0
        bearing=0
        title=""
      >
      </map-location>`

    // @todo  
    const new_story_location_geojson = JSON.stringify({
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates":[center.lng, center.lat]
          }
        }
      ]
    })

    console.log(new_story_location_markup, new_story_location_geojson)
  }
 
  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

class SlideShowControls {
  onAdd(map){
    this._map = map
    this._container = document.createElement('div')
    this._container.classList = 'mapboxgl-ctrl mapboxgl-ctrl-group'

    const next = document.createElement('button')
    const next_label = document.createElement('span')
    next_label.classList = 'mapbox-ctrl-icon'
    next_label.innerHTML = `<svg height='16px' width='16px'  fill="#2d2d2d" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve"><path d="M17.365,16.01l-6.799,6.744c-0.746,0.746-0.746,1.953,0,2.699c0.754,0.745,1.972,0.745,2.726,0l8.155-8.094  c0.746-0.746,0.746-1.954,0-2.699l-8.155-8.094c-0.754-0.746-1.972-0.744-2.726,0c-0.746,0.745-0.746,1.952,0,2.698L17.365,16.01z"></path></svg>` 
    next.appendChild(next_label)
    this._container.appendChild(next)
    next.addEventListener('click', ()=> dispatch('NEXT SLIDE'))

    const home = document.createElement('button')
    const home_label = document.createElement('span')
    home_label.classList = 'mapbox-ctrl-icon'
    home_label.innerHTML = `<svg height='16px' width='16px'  fill="#2d2d2d" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" x="0px" y="0px"><g data-name="34 Home"><path d="M27,29.5H5A1.5,1.5,0,0,1,3.5,28V13.43A1.5,1.5,0,0,1,4,12.29L15,2.86a1.51,1.51,0,0,1,2,0l11,9.43a1.5,1.5,0,0,1,.52,1.14V28A1.5,1.5,0,0,1,27,29.5Zm-20.5-3h19V14.12L16,6,6.5,14.12Z"></path></g></svg>`
    home.appendChild(home_label)
    this._container.appendChild(home)
    home.addEventListener('click', ()=> dispatch('SHOW HOME'))

    const prev = document.createElement('button')
    const prev_label = document.createElement('span')
    prev_label.classList = 'mapbox-ctrl-icon'
    prev_label.innerHTML = `<svg height='16px' width='16px'  fill="#2d2d2d" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve"><path d="M14.647,16.011l6.799-6.744c0.746-0.746,0.746-1.953,0-2.699c-0.754-0.745-1.972-0.745-2.726,0l-8.155,8.094  c-0.746,0.746-0.746,1.954,0,2.699l8.155,8.094c0.754,0.746,1.972,0.744,2.726,0c0.746-0.745,0.746-1.952,0-2.698L14.647,16.011z"></path></svg>`
    prev.appendChild(prev_label)
    this._container.appendChild(prev)
    prev.addEventListener('click', () => dispatch('PREV SLIDE'))

    return this._container

  }

  onRemove(){
    this._container.remove()
    this._map = undefined
  }
}



class MapData extends HTMLElement {
  connectedCallback(){
    /*
      Gets the src Attribute
    */
    this.style.display = 'none'
    this.src = this.getAttribute('src')
    if(this.src === null){
      const src_error = `
        Error: This element requires the attribute src to work.  
        Please consult the readme for more information`
      this.innerHTML = `<error> ${src_error} </error>`
      return new Error(src_error)
    }
    this.removeAttribute('src')
    this.initialize()
  }

  async initialize(){
    this.fetchStoriesFromURL(this.src)
  }
  
  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
      default:
    }
  }

  async fetchStoriesFromURL(url){
    function generateLocationDiv(story_location){
      let story_location_image = ''
      if(story_location.image_link && story_location.image_link !== 'NaN'){
        story_location_image = `<img src="${story_location.image_link}" style="width:100%; height:auto" />`   
      }
      return `
        <map-location id="story_location-${story_location.id}"
          latitude="${story_location.latitude}"
          longitude="${story_location.longitude}"
          zoom="${story_location.zoom}"
          pitch="${story_location.pitch}"
          bearing="${story_location.bearing}"
          title="${_.escape(story_location.title)}"
          originator="${story_location.originator}"
          location_name="${story_location.location}"
        >
        <h2>${story_location.location}</h2>
        ${story_location_image}
          <h1>${_.escape(story_location.title)}</h1>
          <small>Latitude:${story_location.latitude.toFixed(2)}, Longitude:${story_location.longitude.toFixed(2)}</small>
          <p><a style="text-decoration:none;" href="${story_location.description_link}" target="_blank"> ${_.escape(story_location.description)}</a></p>
          <cite><a href="${story_location.citation_link}">${_.escape(story_location.citation)}</a></cite>
        </map-location>`
    }

    fetch(url).then(res => res.json()).then(res => {
      let update = ''
      res.markers.forEach(story_location => {
        update += generateLocationDiv(story_location)
      })
      const location_container = document.createElement('div')
      location_container.innerHTML = update
      this.appendChild(location_container)
      dispatch('SHOW HOME')
    })
  }
}

customElements.define('map-data', MapData)

class MapInformationBox extends HTMLElement {
  connectedCallback(){
    const close_button = document.createElement('button')
    close_button.classList.add('close-button')
    close_button.innerText = 'x'
    close_button.addEventListener('click', (e) => {
      this.remove()
    })

    this.prepend(close_button)

  }
}

customElements.define('map-information-box', MapInformationBox)

class MapNotification extends HTMLElement {
  connectedCallback(){
    const close_button = document.createElement('button')
    close_button.classList.add('close-button')
    close_button.innerText = 'x'
    close_button.addEventListener('click', (e) => {
      this.remove()
    })

    this.prepend(close_button)

  }
}

customElements.define('map-notification', MapNotification)
