import GeoMapElement from './map-element.js'


class MapPath extends GeoMapElement {
	errorCheck(){
		this.coord = this.getAttribute('coordinates')
		if(this.coord === null){
			console.warn('COORDINATES REQUIRED')
		} else {
			this.coord = JSON.parse(this.coord)
		}
	}
	async initialize(){

		const map = this.geo_map.map

			map.addSource('route', {
			'type': 'geojson',
			'data': {
				'type': 'Feature',
				'properties': {},
				'geometry': {
					'type': 'LineString',
					'coordinates': this.coord
					}
				}
			});
			map.addLayer({
				'id': 'route',
				'type': 'line',
				'source': 'route',
				'layout': {
				'line-join': 'round',
				'line-cap': 'round'
			},
			'paint': {
				'line-color': '#888',
				'line-width': 8
			}
			});

	}


}

customElements.define('map-path', MapPath)
