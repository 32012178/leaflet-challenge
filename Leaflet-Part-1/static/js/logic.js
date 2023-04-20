  // Create the tile layer that will be the background of our map.
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let topomap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

// Creating the map object
let myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 11
  });

  // create basemaps 
  let baseMaps = {
    "Street Map": streetmap,
    "Topographic Map": topomap
  };
// earthquake layer creation
  let earthquake = new L.layerGroup(baseMaps);


  // objects defined
  let overlayMaps = {
    earthquake: earthquake
  };
  


// Perform a request to get the query URL
d3.json(url).then(function(data) {
  createFeatures(data.features);
});

function createFeatures(earthquakeData, platesData) {

}