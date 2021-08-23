# geo-map-component

<a href="https://map.garden/demo.html">Look at the demo here</a>

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


# Why

I am a fan (or, some might say, obsessed) with a painter named Caravaggio. I spent an enormous amount of time finding the locations of Caravaggio paintings around this world in Google Maps. It was a useful map! 

Then I got busy with life and put aside my map. A few years later I went back to look at my paintings to find... a Renaissance Tour of Rome! 
