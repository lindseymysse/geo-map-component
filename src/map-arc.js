import * as deck from "https://unpkg.com/deck.gl@^8.0.0/dist.min.js"
import GeoMapElement from './map-element.js'

class MapArc extends HTMLElement {
  connectedCallback(){
     const {MapboxLayer, ScatterplotLayer, ArcLayer} = deck;

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

customElements.define('map-arc', MapArc)





 // addEdge(edge){
 //   
 //    const source_id = edge.getAttribute('source')
 //    const target_id = edge.getAttribute('target')
 //    const source_el = document.querySelector(`#${source_id}`)
 //    const target_el = document.querySelector(`#${target_id}`)
 //    const source_longitude = parseFloat(source_el.getAttribute('longitude'))
 //    const source_latitude = parseFloat(source_el.getAttribute('latitude'))
 //    const target_longitude = parseFloat(target_el.getAttribute('longitude'))
 //    const target_latitude = parseFloat(target_el.getAttribute('latitude'))

 //    const edge_id = this.getNewID()
 //    this.map.addLayer(new MapboxLayer({
 //      id: edge_id,
 //      type: ArcLayer,
 //      data: [
 //        {source: [source_longitude, source_latitude], target: [target_longitude, target_latitude]}
 //      ],
 //      getSourcePosition: d => d.source,
 //      getTargetPosition: d => d.target,
 //      getSourceColor: [255, 255, 255],
 //      getTargetColor: [255, 255, 255],
 //      getWidth: 4
 //    }))
 //  }