# geo-map-component
A web Component wrapper for Mapbox

## Current Features

### Markup based geolocative maps

## Requirements

```XML
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
<script src='https://api.mapbox.com/mapbox.js/v3.3.1/mapbox.js'></script>
<script src='https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.js'></script>
<link href='https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css' rel='stylesheet' />
<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.min.js"></script>
<script src="https://unpkg.com/three@0.126.0/build/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@turf/turf@5/turf.min.js"></script>
<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.css" type="text/css">


```

# Markup Components

```XML
  <geo-map
    latitude=0
    longitude=0
    zoom=1
    accesstoken=
    styleurl=
    bearing=0
    pitch=0
  >

    <map-location
      latitude=
      longitude=

    >
      <p>Place content of location here</p>
    </map-location>

  </geo-map>
```

required: 
- latitude
- longitude
- zoom
- accesstoken
- styleurl

optional:
- pitch
- bearing
