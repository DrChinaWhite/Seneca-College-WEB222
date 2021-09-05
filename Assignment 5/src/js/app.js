// An instance of our SimpleMap, created below when the window loads.
let map;

// Update the map to show markers for the set of observations
function updateMap(observations, map) {
  // Clear the current markers on the map (if any)
  map.clear();

  observations.forEach(function (observation) {
    map.addObservation(observation);
  });
}

// Update the cards to show markers for the set of observations
function updateCard(observations) {

  // Populate the cards with all observation data we want to show
  observations.forEach((observation) => {
    let card = buildCardForObservation(observation);
    addCard(card);
  });
}

// Show all species on the map and table
function showAll() {
  // Get all the observations from our data.js and format them so we can work with the data
  const observations = getAllObservations();

  // Update the map and table
  updateMap(observations, map);
  updateCard(observations);
  updateTableTitle(`All Species (${observations.length})`);
}

// Show native species on the map and table
function showOnlyNative() {
  // Get all the observations from our data.js and format them so we can work with the data
  const observations = getAllObservations();
  // Filter out any that aren't native species
  const native = filterOnlyNative(observations);

  // Update the map and table
  updateMap(native, map);
  updateCard(native);
  updateTableTitle(`Only Native Species (${native.length})`);
}

// Show introduced species on the map and table
function showOnlyIntroduced() {
  // Get all the observations from our data.js and format them so we can work with the data
  const observations = getAllObservations();
  // Filter out any that aren't introduced species
  const introduced = filterOnlyIntroduced(observations);
  // Update the map and table
  updateMap(introduced, map);
  updateCard(introduced);
  updateTableTitle(`Only Introduced Species (${introduced.length})`);
}

function start() {
  // Create our map object for Seneca's Newnham campus
  map = new SimpleMap("map-container", 43.7955, -79.3496);
  
  let button = document.getElementById("show-all");
  button.onClick = (event) => {
    showAll(); 
  };
  let button2 = document.getElementById("show-native");
  button2.onClick = (event) => {
    showOnlyNative();
  };
  let button3 = document.getElementById("show-introduced")
  button3.onClick = (event) => {
    showOnlyIntroduced();
  };
  
  // Show all species observations by default when we start.
  showAll();
}

document.addEventListener("DOMContentLoaded", function () {
 start();
});
