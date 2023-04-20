// retrieve earthquake data
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create the tile layer that will be the background of our map.
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Creating the map object
let myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 11
  });
  
// Then we add our 'basemap' tile layer to the map.
basemap.addTo(map);

// Perform a request to get the query URL
d3.json(url).then(function(data) {
  createFeatures(data.features);
});

function createFeatures()