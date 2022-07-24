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



import 'https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js'
import 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.min.js'
import 'https://unpkg.com/three@0.126.0/build/three.min.js'
import 'https://unpkg.com/deck.gl@^8.0.0/dist.min.js'
import  * as turf from 'https://cdn.jsdelivr.net/npm/@turf/turf'

function ready(callbackFunction){
  if(document.readyState === 'complete')
    callbackFunction(event)
  else
    document.addEventListener("DOMContentLoaded", callbackFunction)
}

function getNewID() {
  return 'dtrm-xxxxxxxxxxxxxxxx-'
    .replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16)
  }) + Date.now()
}

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


export class GeoMapComponent extends HTMLElement {
  constructor() {
    super();
    if(typeof(mapboxgl) === 'undefined'){
      return console.error('Geo Map component requires Mapbox to work');
    }

    const URLvalues = getURLValues();

    this.access_token = this.getAttribute('accesstoken');
    if(this.access_token === null){
      return console.error('Geo Map component requires a MapBox access token');
    }
    this.removeAttribute('accesstoken');
    mapboxgl.accessToken = this.access_token;

    this.styleurl = this.getAttribute('styleurl');
    if(this.styleurl === null || this.styleurl === ""){
      console.warn('could not find style url, using the default');
      this.styleurl = 'mapbox://styles/mapbox/streets-v11';
    }
    this.removeAttribute('styleurl');

    this.latitude = this.getAttribute('latitude');
    if(this.latitude === null) this.latitude = 0;
    this.latitude = URLvalues.latitude ? URLvalues.latitude : this.latitude;

    this.longitude = this.getAttribute('longitude');
    if(this.longitude === null) this.longitude = 0;
    this.longitude = URLvalues.longitude ? URLvalues.longitude : this.longitude;

    this.zoom = this.getAttribute('zoom');
    if(this.zoom === null) this.zoom = 1;
    this.zoom = URLvalues.zoom ? URLvalues.zoom : this.zoom;

    this.bearing = this.getAttribute('bearing');
    if(this.bearing === null) this.bearing = 0;
    this.bearing = URLvalues.bearing ? URLvalues.bearing : this.bearing;

    this.pitch = this.getAttribute('pitch');
    if(this.pitch === null) this.pitch = 0;
    this.pitch = URLvalues.pitch ? URLvalues.pitch : this.pitch;

    this.locked = this.getAttribute('locked');
    if(this.locked === null){
      this.locked = false;
    } else {
      this.locked = true;
    };
  }

  connectedCallback() {
    ready(() => this.initialize())
  }

  async initialize(){
    const el = document.createElement('map-container')
    this.appendChild(el)
    this.map = await new mapboxgl.Map({
      container: el, // container ID
      style: this.styleurl, // style URL
      center: [this.longitude, this.latitude],
      zoom: this.zoom,
      bearing: this.bearing,
      projection: 'globe',
      pitch: this.pitch,
      style: this.styleurl,
      interactive: !this.locked
    })

    this.initialized = true;
    this.map.on('load', () => {this.mapLoaded()})
  }

  mapLoaded(){

  }

  disconnectedCallback() {

  }

  static get observedAttributes() {
    return [
  'accesstoken',
  'styleurl',
  'latitude',
  'longitude',
  'zoom',
  'bearing',
  'pitch',
  'geolocate',
  'geocoder',
  'navigation',
  'flyhome',
  'edit',
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name){
      default: 
        break;
    }
  }

}

customElements.define("geo-map", GeoMapComponent);

