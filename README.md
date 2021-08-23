  <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
  <script src='https://api.mapbox.com/mapbox.js/v3.3.1/mapbox.js'></script>
  <script src='https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.js'></script>
  <link href='https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css' rel='stylesheet' />
  <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.min.js"></script>
  <script src="https://unpkg.com/three@0.126.0/build/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@turf/turf@5/turf.min.js"></script>
  <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.css" type="text/css">
  <script src="geo-map.js"></script>
  <link rel="stylesheet" type="text/css" href="geo-map.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.5.0/dist/chart.min.js"></script>
  <geo-map
    accesstoken=pk.eyJ1IjoibGluZHNleW15c3NlIiwiYSI6ImNqOGNlYjMzbDA5am8zMmxid2oyc3hrc2cifQ.hK6NXKEl7bK7va2pRtY0Yw
    styleurl=mapbox://styles/lindseymysse/cjcqx0yoi5l6c2ro9kxheop6d
    geolocate
    geocoder
    navigation
    slideshow>

    <map-key>
    </map-key>
    
    <map-data
      src="https://reflective-earth.herokuapp.com/api/qualitative"
    ></map-data>

    <map-notification>
      <a href="/">Return to the main map</a>
    </map-notification>


</geo-map>


# geo-map-component

A web Component wrapper for maps, currently built for mapbox.

This component wraps the mapbox API using the new Custom Web Components api, allowing you to create and embed new mapbox maps with ease. 


## Usage

I do not recommend production usage of this software at this point. I would recomend you vendor the code and incorporate its components into your software. 

## Current Features


## Markup based geolocative maps

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

  <!-- 
    

  -->
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
      bearing=0
      pitch=0

    >
      <map-marker>
        <h1>Any HTML can be a map marker!</h1>
      </map-marker>

    </map-location>

    <!-- pitch and bearing are not required, but lat lng are-->
    <map-location
      latitude=
      longitude=
    >
      <map-marker rotation-alignment="map">
        <h1>This places the marker on the map itself</h1>
      </map-marker>

    </map-location>


    <map-key>
      <!-- This Key appears only when the map is zoomed out the furthest from the user --> 
    </map-key>
    
    <map-data
      src="" 

    >
      <!-- Any source from map data will return here as map-locations and then will be placed on the map -->
    </map-data>

    <map-notification>

      <a href="/">A Simple Link Here</a>
    </map-notification>


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
