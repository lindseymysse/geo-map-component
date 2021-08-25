Cinematic Mapping Markup.

<a href="https://map.garden/demo.html"><img src="geo-map-logo.png"></a>


## What does it look like? 

```XML
<geo-map
  geolocate
  geocoder
  navigation
  slideshow
  latitude=0
  longitude=0
  zoom=1
  accesstoken=
  styleurl=
  bearing=0
  pitch=0>
  <map-location
    latitude=
    longitude=
    bearing=0
    pitch=0 >
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
    src="url to GeoJSON data">
    <!-- Any source from map data will return here as map-locations and then will be placed on the map -->
  </map-data>
  
  <map-notification>
    <a href="/">A Simple Link Here</a>
  </map-notification>
</geo-map>

```

email lindsey.mysse@gmail.com for more info.
