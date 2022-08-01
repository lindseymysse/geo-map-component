import { GeoMapComponent } from './geo-map-component.js'

function easing(t) {
  return t * (2 - t);
}
    
const deltaDegrees = 0.5;
const deltaDistance = 0.1;
let rotation_velocity = 0;
let pitch_velocity = 0.0;
let zoom_velocity = 0.0;


class BlimpSimulator extends GeoMapComponent {
  constructor() {
    super();
  }

  async onMove(){
    const terrain_elevation = this.map.queryTerrainElevation(this.map.getCenter());
    console.log(terrain_elevation)
  }



  async rotate(direction){
    if(direction === 'port'){
      rotation_velocity -= 0.005;
      if(rotation_velocity < -0.01){
        rotation_velocity = -0.01;
      }
    } else {
      rotation_velocity += 0.005;
      if(rotation_velocity > 0.01){
        rotation_velocity = 0.01;
      }
    }
  }

  adjustPitch(direction){
    if(direction === 'up'){
      pitch_velocity += 0.005;
      if(pitch_velocity > 0.01){
        pitch_velocity = 0.01
      }
      
    } else {
      pitch_velocity -= 0.005;
      if(pitch_velocity < -0.01){
        pitch_velocity = -0.01;
      }
    }
  }

  move(){
    const current_pitch = this.map.getPitch();
    const current_zoom = this.map.getZoom();
    let new_zoom_velocity = 0
    if(current_pitch > 75){
      new_zoom_velocity = -0.00001 * current_pitch;
    } else if (current_pitch < 60) {
      new_zoom_velocity = 0.00001 * current_pitch;
    }

    console.log("zoom:", current_zoom, "pitch", current_pitch, "new zoom velocity", new_zoom_velocity, pitch_velocity, rotation_velocity);
    this.map.panBy([0, -deltaDistance], {
      animate:false
    })
    .easeTo({
      bearing: this.map.getBearing() + rotation_velocity,
      animate: false
    }).setPitch(current_pitch + pitch_velocity)
    .setZoom(current_zoom + new_zoom_velocity);
  }

  mapLoaded(){
    this.map.addSource('mapbox-dem', {
      'type': 'raster-dem',
      'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
      'tileSize': 512,
      'maxzoom': 14
      });
    this.map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
    this.map.setFog({
    'range': [0, 20],
    'horizon-blend': 0.3,
    'color': 'white',
    'high-color': '#add8e6',
    'space-color': '#d8f2ff',
    'star-intensity': 0.0
    });


    this.map.on('move', (e) => {
      this.onMove()
    })

    setInterval(()=>{this.move()},20); 
    this.map.getCanvas().addEventListener(
    'keydown',
      (e) => {
        e.preventDefault();
        console.log(e.which);
        if (e.which === 37) {
          this.rotate('port');
        } else if (e.which === 39) {
          this.rotate('starboard');
        } else if(e.which === 38){
          this.adjustPitch('down');
        } else if(e.which === 40){
          this.adjustPitch('up');
        }
      },
      true
    );
  }

}

customElements.define("blimp-simulator", BlimpSimulator);
