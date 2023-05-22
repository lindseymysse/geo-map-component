geo_map.addEventListener('loaded', function(e){
  // what to do when the map is loaded
  console.log('Map Loaded');
});

geo_map.addEventListener('MAP MOVED', function(e){
  const { coords, bounds, zoom } = e.detail;
  console.log(coords, bounds, zoom);
  const popup_content = `
    <p>${JSON.stringify(coords)}</p>
    <p>${JSON.stringify(bounds)}</p>
    <p>${JSON.stringify(zoom)}</p>
  `;
  // geo_map.showPopup(popup_content);
});
