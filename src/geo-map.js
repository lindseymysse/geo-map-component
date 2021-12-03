
import { dispatch, ready } from './helpers.js'
import './map-location.js'

export class GeoMap extends HTMLElement {
  connectedCallback(){
  	ready(() => this.initialize())
  }

  initialize(){
  	console.log('initializing...')
  	
  	this.initialized = true
  	dispatch('INITIALIZED',{},this)
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


