

import GeoMapElement from './map-element.js'
import 'https://unpkg.com/three@0.126.0/build/three.min.js'
import 'https://unpkg.com/three@0.126.0/examples/js/loaders/GLTFLoader.js'

import { getNewID } from './helpers.js'
import "//unpkg.com/three-forcegraph"


class MapGraph extends GeoMapElement {
	initialize(){



		const map = this.geo_map.map


			const modelOrigin = [this.longitude,this.latitude];
			const modelAltitude = 70;
			const modelRotate = [Math.PI / 2, 0, 0];
			 
			const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
			modelOrigin,
			modelAltitude
			);
			 
			// transformation parameters to position, rotate and scale the 3D model onto the map
			const modelTransform = {
			translateX: modelAsMercatorCoordinate.x,
			translateY: modelAsMercatorCoordinate.y,
			translateZ: modelAsMercatorCoordinate.z,
			rotateX: modelRotate[0],
			rotateY: modelRotate[1],
			rotateZ: modelRotate[2],
			/* Since the 3D model is in real world meters, a scale transform needs to be
			* applied since the CustomLayerInterface expects units in MercatorCoordinates.
			*/
			scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
			};
			 
			const THREE = window.THREE;
			 
			// configuration of the custom layer for a 3D model per the CustomLayerInterface
			const customLayer = {
				id: '3d-model',
				type: 'custom',
				renderingMode: '3d',
				onAdd: function (map, gl) {
					this.map = map;
					this.camera = new THREE.Camera()
					this.scene = new THREE.Scene()
					 
					// create two three.js lights to illuminate the model
					const directionalLight = new THREE.DirectionalLight(0xffffff)
					directionalLight.position.set(0, -70, 100).normalize()
					this.scene.add(directionalLight)
					 
					const directionalLight2 = new THREE.DirectionalLight(0xffffff);
					directionalLight2.position.set(0, 70, 100).normalize()
					this.scene.add(directionalLight2)
					 
					this.mygraph = new ThreeForceGraph()
						.jsonUrl('/miserables.json')
						.nodeThreeObject(function(node){

							const geometry = new THREE.BoxGeometry(10,10,10)
							const material = new THREE.MeshLambertMaterial( { color: node.color ? node.color : 0x00ff00 } )
							const cube = new THREE.Mesh( geometry, material )

							return cube
						})
						.linkDirectionalParticles(10)

					this.map.on('mousemove', (e) => {
						//https://stackoverflow.com/questions/59163141/raycast-in-three-js-with-only-a-projection-matrix/61642776#61642776
					})

					this.map.on('click', (e) => {
						console.log(e) 
					})

					this.scene.add(this.mygraph)
		 
					// use the Mapbox GL JS map canvas for three.js
					this.renderer = new THREE.WebGLRenderer({
						canvas: map.getCanvas(),
						context: gl,
						antialias: true
					});
					 
					this.renderer.autoClear = false;
				},
				render: function (gl, matrix) {


					const rotationX = new THREE.Matrix4().makeRotationAxis(
					new THREE.Vector3(1, 0, 0),
					modelTransform.rotateX
					)
					const rotationY = new THREE.Matrix4().makeRotationAxis(
					new THREE.Vector3(0, 1, 0),
					modelTransform.rotateY
					)
					const rotationZ = new THREE.Matrix4().makeRotationAxis(
					new THREE.Vector3(0, 0, 1),
					modelTransform.rotateZ
					)
					 
					const m = new THREE.Matrix4().fromArray(matrix);
					const l = new THREE.Matrix4()
						.makeTranslation(
						modelTransform.translateX,
						modelTransform.translateY,
						modelTransform.translateZ
						)
						.scale(
						new THREE.Vector3(
						modelTransform.scale,
						-modelTransform.scale,
						modelTransform.scale
						)
						)
						.multiply(rotationX)
						.multiply(rotationY)
						.multiply(rotationZ)
						 
						this.camera.projectionMatrix = m.multiply(l)
						this.renderer.resetState()
						this.renderer.render(this.scene, this.camera)
						this.map.triggerRepaint()
						this.mygraph.tickFrame()
				} // end render
			}//end custom layer


		this.geo_map.map.on('style.load', () =>{



			// add a sky layer that will show when the map is highly pitched
			map.addLayer({
				'id': 'sky',
				'type': 'sky',
				'paint': {
					'sky-type': 'atmosphere',
					'sky-atmosphere-sun': [0.0, 0.0],
					'sky-atmosphere-sun-intensity': 15
				}
			});


			
				console.log('adding layer...')
				this.geo_map.map.addLayer(customLayer)

		})

	}

}

customElements.define('map-graph', MapGraph)




/*

var myGraph = new ThreeForceGraph()
    .graphData(<myData>);

var myScene = new THREE.Scene();
myScene.add(myGraph);

...

// on animation frame
myGraph.tickFrame();

*/


/*

{
    "nodes": [
        {
            "id": "id1",
            "name": "name1",
            "val": 1
        },
        {
            "id": "id2",
            "name": "name2",
            "val": 10
        },
        (...)
    ],
    "links": [
        {
            "source": "id1",
            "target": "id2"
        },
        (...)
    ]
}

*/




