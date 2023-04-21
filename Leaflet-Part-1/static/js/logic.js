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

  // adding a control so you can adjust layers
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);

  // set the style data for each earthquake included on the map.
  function styleInfo(features) {
    return {
      fillOpacity: 1,
      fillcolor: getColor(features.geometry.coordinates[2]),
      color: "#000000",
      radius: getRadius(features.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

// This function sets the circle colour for the earthquake depending on its depth
function getColour(depth) {
  if (depth > 90) {
      return "#19073B";
  }
  else if (depth > 70) {
      return "#573172";
  }
  else if (depth >50) {
      return "#804E74";
  }
  else if (depth > 30) {
      return "#A96A77";
  }
  else if (depth > 10) {
      return "#D18779";
  }
  else if (depth > -10){
  return "#F29455";
  }
  else {
  return "#FF51EB"  
  }
};

// Perform a request to get the query URL
d3.json(url).then(function(data) {
  createFeatures(data.features);
});

function createFeatures(earthquakeData, platesData) {

}