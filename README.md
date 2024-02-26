# README for GeoMap Component

## Overview

This README provides instructions on how to integrate and use the GeoMap Component, a custom web component designed to display and interact with maps using Mapbox. The component enables loading maps with specific coordinates, styles, and configurations. It supports events like map loading and moving, and allows for displaying custom popups based on user interactions. Additionally, it includes CSS customizations and utility functions to enhance the map's functionality and appearance.

### Files Structure

- `app.js`: Contains event listeners and logic for map interactions.
- `geo-map-component.css`: Defines the styling for the map and its elements.
- `geo-map-component.js`: Implements the GeoMap Component using Mapbox.
- `geo-map-modal.js`: Manages modal windows within the map component.
- `helpers.js`: Provides utility functions used by the GeoMap Component.
- `index.html`: An example HTML file demonstrating how to embed the GeoMap Component into a webpage.
- `index.js`: Imports the GeoMap Component and modal scripts.

## How to Use

### 1. Setup

Ensure you have an active Mapbox access token. If you don't have one, sign up at [Mapbox](https://www.mapbox.com/) and generate a token.

### 2. Integration

Include the necessary CSS and JS files in your HTML document. You must import Mapbox CSS files and the custom CSS (`geo-map-component.css`) for the GeoMap Component. Similarly, import Mapbox GL JS and the component JS files (`geo-map-component.js`, `geo-map-modal.js`, and `helpers.js`).

Example:

```html
<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css">
<link rel="stylesheet" href="geo-map-component.css">
<script src="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js"></script>
<script src="index.js" type="module"></script>
```

### 3. Embedding the Component

Embed the `geo-map` component in your HTML body. You must specify certain attributes such as `accesstoken`, `styleurl`, `latitude`, `longitude`, `zoom`, `bearing`, and `pitch`. You can also enable features like `navigation`, `geolocate`, and `geocoder`.

Example:

```html
<geo-map
  accesstoken="YOUR_MAPBOX_ACCESS_TOKEN"
  styleurl="mapbox://styles/mapbox/streets-v11"
  latitude="33.86716840617632"
  longitude="-118.12701323464881"
  zoom="9"
  bearing="0"
  pitch="45"
  navigation
  geolocate
  geocoder="true"
  search-bounds="-118.48176410291592, 33.66337686568919, -117.58037748630301, 34.41894361494393"
>
  <!-- Additional elements like geo-map-modal can be nested here -->
</geo-map>
```

### 4. Customization

You can customize the appearance and behavior of the GeoMap Component and its elements using CSS variables defined in `geo-map-component.css`. Modify these variables as needed to match your design requirements.

### 5. Event Handling

Add event listeners in your JavaScript to handle map events like `loaded` and `MAP MOVED`. Refer to `app.js` for examples on how to implement these listeners.

Example:

```javascript
document.getElementById('geo_map').addEventListener('loaded', function(e) {
  console.log('Map Loaded');
});
```

## Additional Information

- The GeoMap Component is highly customizable. You can adjust map settings, styles, and event handlers as needed.
- The component uses modern JavaScript features. Ensure your development and target environments support these features.
- For further customization and advanced features, refer to the Mapbox GL JS documentation.

## Support

For issues, questions, or contributions, please refer to the project's GitHub repository or contact the maintainer directly.
