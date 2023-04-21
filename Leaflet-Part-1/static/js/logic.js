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

// This function sets the radius of the earthquake circle marker based on its magnitude
function getRadius(mag) {
  return mag * 5;  
};

// Grab the geoJson data from the url (stored in the config.js file)
d3.json(queryUrl).then(function(data) {
  // Create a geoJson layer with the data
      L.geoJson(data, {
          // Turn the data into a circle marker on the map
          pointToLayer: function(features, latlng) {
          return L.circleMarker(latlng);
          },
          // Set the style for each circle marker
          style: styleInfo,
          onEachFeature: function(features, layer) {
              layer.bindPopup(`<h3>${features.properties.place}</h3><hr>
              <p><strong>Coordinates:</strong> ${features.geometry.coordinates[1]}, ${features.geometry.coordinates[0]} 
              <br><strong>Magnitude:</strong> ${featurs.properties.mag} 
              <br><strong>Depth:</strong> ${features.geometry.coordinates[2]}
              <br>${new Date(features.properties.time)}</p>`);
            }
          }).addTo(earthquake);
    
      // Add the earthquake layer to the map
      earthquake.addTo(myMap);
    });

let legend = L.control({position: 'bottomright'});

// create components of the legend
legend.onAdd = function (map) {
let div = L.DomUtil.create('div', 'legend');
  div.innerHTML += '<i style="background: #F29455"></i><span>-10-10</span><br>';  
  div.innerHTML += '<i style="background: #D18779"></i><span>10-30</span><br>';
  div.innerHTML += '<i style="background: #A96A77"></i><span>30-50</span><br>';
  div.innerHTML += '<i style="background: #804E74"></i><span>50-70</span><br>';
  div.innerHTML += '<i style="background: #573172"></i><span>70-90</span><br>';
  div.innerHTML += '<i style="background: #19073B"></i><span>90+</span><br>';
  return div;
};

// Add legend to the map
legend.addTo(myMap);

