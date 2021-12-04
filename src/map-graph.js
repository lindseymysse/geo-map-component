import GeoMapElement from './map-element.js'
import "//unpkg.com/three-forcegraph"


class MapGraph extends GeoMapElement {
	initialize(){
		console.log('INITIALIZED')
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




