/**
 * WEB222 – Assignment 02
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name: Dale Hawkins
 *      Student ID: #########
 *      Date: Feb 17th 2021
 *
 * Please see all unit tests in the files problem-01.test.js, problem-02.test.js, etc.
 */

const { results } = require('./data');

/*******************************************************************************
 * Problem 0: learn how to work with the cases data.
 *
 * Welcome to Assignment 2! In this assignment, you're going to be practicing
 * different ways of working with JavaScript Objects, both built-in Objects
 * like Array and String, and also working with custom Objects you create.
 *
 * Before you dive into all the problems below, let's spend a minute helping you
 * learn how to work with the sample user data included in this assignment.
 *
 * We've included an extra file in this assignment: `data.js`.  This is data
 * that was obtained from the iNaturalist API.  iNaturalist is available at
 * https://www.inaturalist.org/ and lets people around the world share and track
 * sightings and helps identify plants, animals, insects, and other organisms.
 * It's a phenomenal tool for scientists and curious naturalists alike.
 *
 * During the next few assignments, we'll be making use of their data to build
 * some interesting web projects.  In this assignment, we'll start working with their
 * data using the knowledge we've gained using Arrays, Objects, and Regular Expressions.
 *
 * The iNaturalist data is typical of a lot of data we use on the web: it's formatted
 * as an Object, with key/value pairs to express the data.  We use strings, numbers,
 * boolean, as well as Arrays and even Objects.  Learning how to traverse and
 * manipulate this data is important.
 *
 * Take a look at src/data.js now to get a sense of what the data looks like. This
 * data includes 10 observations for an area of 1km around the Seneca Newnham campus.
 */

/*******************************************************************************
 * Problem 00: Learning to write our tests
 *
 * Each of the functions below will be passed a `data` argument, which is
 * an Object returned by calling the iNaturalist API.  It looks something like
 * this:
 *
 * {
 *   total_results: 125,
 *   page: 1,
 *   per_page: 10,
 *   results: [
 *       ...observation results here...
 *   ]
 * }
 *
 * The data includes `total_results` (how many results there are), how many
 * separate pages of data (i.e., `page`), how many results on each page (`per_page`)
 * and finally the Array of `results`.
 *
 * To get you started, write a function that accepts a full `data` Object and returns
 * only the `results` Array.
 *
 * You can try running this test using the following command:
 *
 * npm test problem-00
 *
 * See if you can get this test to pass by fixing the bug in the code below.
 ******************************************************************************/
function getResults(data) {
  return data.results;
}

/*******************************************************************************
 * Problem 01 Part 1: use a for-loop to iterate over Arrays
 *
 * Write a function named `observationSummary(data)` that loops over every
 * observation Object in the results array, and calls `console.log()`, passing
 * it a formatted String that looks like this:
 *
 * "#67868131 - Muskrat (2021-01-10)"
 *
 * The formatted String above is made up of the following observation properties:
 *
 *   - id
 *   - species_guess
 *   - observed_on_details and date
 *
 * In your solution, make use of a for-loop to iterate over the items in users
 *
 * Your function shouldn't return anything, just call console.log()
 ******************************************************************************/
function observationSummary(data) {
  for (let i = 0; i < data.results.length; i++) {
    console.log(
      `#${data.results[i].id} - ${data.results[i].species_guess} (${data.results[i].observed_on_details.date})`
    );
  }
}

/*******************************************************************************
 * Problem 01 Part 2: use forEach() to iterate over Arrays
 *
 * Rewrite your code from `observationSummary(data)` above to use a forEach()
 * function instead of a for-loop.  Everything else should be identical.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 ******************************************************************************/
function observationSummary2(data) {
  data.results.forEach((results) =>
    console.log(`#${results.id} - ${results.species_guess} (${results.observed_on_details.date})`)
  );
}

/*******************************************************************************
 * Problem 02: observationsByGeoPrivacy(data, geoPrivacy)
 *
 * iNaturalist users can hide or alter the geolocation coordinate data for an
 * observation they make.  For example, I might see a butterfly in my backyard,
 * but don't want to share the location of my home.
 *
 * Write a function that takes Observation data, as well as a geoPrivacy value.
 * The geoPrivacy value describes whether the geolocation data is "open",
 * "obscured", "private", or null (i.e., unspecified.  In other words, you should
 * expect a string or null value.
 *
 * Return a new Array with only those observation Objects that contain a geoprivacy
 * value that matches the geoPrivacy argument to your function.  For example:
 *
 * observationsByGeoPrivacy(data, "open") would return an Array of observation
 * objects that have `geoprivacy: "open"`.
 *
 * observationsByGeoPrivacy(data, null) would return an Array of observation
 * objects that have `geoprivacy: null`.
 *
 * observationsByGeoPrivacy(data, "OPEN") would return an Array of observation
 * objects that have `geoprivacy: "open"` (i.e., UPPERCASE geoPrivacy values
 * should be converted to lowercase).
 *
 * In your solution, make use of the following:
 *
 *  - create an empty array
 *  - use a for...of loop to loop over all Objects in results
 *  - if an observation includes the given geoprivacy value, add the observation
 *    Object to the empty Array. Make sure you deal with both UPPER and lowercase
 *    geoPrivacy values: all geoprivacy values on the observations are lowercase.
 *
 * Your function should return the newly created Array.
 ******************************************************************************/
function observationsByGeoPrivacy(data, geoPrivacy) {
  let privacyData = [];

  if (typeof geoPrivacy === 'string') {
    geoPrivacy = geoPrivacy.toLowerCase();
  }
  for (let result of data.results) {
    if (result.geoprivacy === geoPrivacy) {
      privacyData.push(result);
    }
  }
  return privacyData;
}

/*******************************************************************************
 * Problem 3 Part I: transformObservation(original) and transformObservations(cases)
 *
 * Write functions to transform COVID case data into a new Object format.
 *
 * The `transformObservation(original)` function takes an observation Object that
 * looks like this the values in src/data.js and transforms the data in the `original`
 * Object into a new Object that looks like this (see comments on right-hand side
 * with details):
 *
 * {
 *   id: 67868131,                           // copy the id over without modification
 *   speciesGuess: 'Muskrat',                // species_guess renamed
 *   isResearchQuality: true,                // true if quality_grade is 'research', false otherwise
 *   coords: [-79.3565522733, 43.798774894], // location converted to Array of Numbers, longitude first
 *   photos: [                               // modify photos to be Array of URLs
 *     'https://static.inaturalist.org/photos/109762131/square.jpg?1610308133'
 *   ],
 *   user: '@dridgen'                        // the user's login_exact name with @ prefix
 * }
 ******************************************************************************/
function transformObservation(original) {
  let researchQuality = original.quality_grade === 'research' ? true : false;
  let lngLat = original.location.split(',');
  let photoURLArray = original.photos.map((object) => {
    return object.url;
  });

  let newObject = {
    id: original.id,
    speciesGuess: original.species_guess,
    isResearchQuality: researchQuality,
    coords: [parseFloat(lngLat[1]), parseFloat(lngLat[0])],
    photos: photoURLArray,
    user: `@${original.user.login_exact}`
  };

  return newObject;
}

/*******************************************************************************
 * Problem 3 Part II: transformObservations(data) with iteration
 *
 * The `transformObservations(data)` function takes observation data and uses it
 * to create and return a new Array of transformed observation Objects,
 * calling the transformObservation() function you wrote above on each one.
 *
 * In your solution, make use of the following:
 *
 *  - create a new empty Array to hold all the transformed cases
 *  - use a for-loop or .forEach() method to loop over all Objects in the data results Array
 *  - pass each observation Object to your transformObservation() function to get a new Object
 *  - add the new, transformed Object to your array
 *  - return the new Array containing all the transformed Objects
 ******************************************************************************/
function transformObservations(data) {
  let transformedCases = [];
  data.results.forEach((object) => {
    transformedCases.push(transformObservation(object));
  });
  return transformedCases;
}

/*******************************************************************************
 * Problem 3 Part III: transformObservations2(data) with .map()
 *
 * Rewrite your transformObservations() function from above a second time using
 * the Array .map() method see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 *
 * In your solution, make use of the following:
 *
 *  - use the .map() method of the data results Array to create a new Array
 *  - In the .map() method's function, call your transformObservation() function
 *  - return the Array created by the .map() method
 ******************************************************************************/
function transformObservations2(data) {
  let transformedCases = data.results.map((object) => transformObservation(object));
  return transformedCases;
}

/*******************************************************************************
 * Problem 04: getObservationsById()
 *
 * Write function to get the observation Object(s) for a given ID, or list of IDs.
 *
 * Calling getObsesrvationsById() with a single `id` value should return the
 * observation Object that has that ID.  For example:
 *
 * getObservationById(data, 161020) would return the single Object in the results
 * Array with an id property matching 161020.
 *
 * Similarly, if a single unknown id value is passed, return null:
 *
 * getObservationById(data, -12341234) would return null.
 *
 * Finally, getObservationById(data, 161020, 161021) would return an Array of 2
 * observation Objects, whose id property matches the id values specified. If
 * any of the ids in the list are unknown, skip this id and dont add anything to
 * the returned Array.
 *
 * For example, the following would return an Array of 2 case observation Objects,
 * ignoring the unknown third id:
 *
 * getObservationById(data, 161020, 161021, -12341234) would return an Array of 2 cases.
 *
 * In your solution, make use of the following:
 *
 *  - use the .forEach() method to iterate over all ids passed to your function
 *  - use the .find() method to locate items by id, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
 ******************************************************************************/
function getObservationsById(data, ...ids) {
  let returnArray = [];
  let returnedObj;

  if (arguments.length === 2) {
    let id = arguments[1];
    if (id < 0 || typeof id !== 'number') {
      return null;
    }

    returnedObj = data.results.find((object) => {
      object.id === id;
      return object.id;
    });
    return returnedObj;
  }

  ids.forEach((object) => {
    if (typeof object === 'number' && object > 0) {
      let tempObj = data.results.find(({ id }) => id === object);
      returnArray.push(tempObj);
    }
  });
  return returnArray;
}

/*******************************************************************************
 * Problem 05: getObservationsByPositionalAccuracy()
 *
 * Write a function that filters observations according to their positional
 * accuracy. iNaturalist allows users to give an accuracy level in meters for
 * the location.
 *
 * Your function should accept iNaturalist data, and an options Object, which
 * may contain various filtering options.  The return value is an Array of
 * observations, whose positional_accuracy value matches the options provided.
 * For example:
 *
 * getObservationsByPositionalAccuracy(data, { equal: 135 }) means only return
 * observations whose positional_accuracy is equal to 135 exactly.
 *
 * getObservationsByPositionalAccuracy(data, { min: 35 }) means only return
 * observations whose positional_accuracy is greater than or equal to 35.
 *
 * getObservationsByPositionalAccuracy(data, { max: 1035 }) means only return
 * observations whose positional_accuracy is less than or equal to 1035.
 *
 * getObservationsByPositionalAccuracy(data, { min: 35, max: 1035 }) means only
 * return observations whose positional_accuracy is greater than or equal to 35
 * AND less than or equal to 1035.
 *
 * If no options object is given, or none of the expect values are present (i.e.
 * equal, min, max), then return all values.  If all of equal, min, and max
 * are given, prefer equal (i.e., ignore min/max).
 *
 * Use the Array .filter() function in your solution.
 ******************************************************************************/
function getObservationsByPositionalAccuracy(data, options = {}) {
  let observationsWithPositionalAccuracy = [];
  options.equal
    ? (observationsWithPositionalAccuracy = data.results.filter(
        (object) => object.positional_accuracy === options.equal
      ))
    : options.min && options.max
    ? (observationsWithPositionalAccuracy = data.results.filter(
        (object) =>
          object.positional_accuracy >= options.min && object.positional_accuracy <= options.max
      ))
    : options.min
    ? (observationsWithPositionalAccuracy = data.results.filter(
        (object) => object.positional_accuracy >= options.min
      ))
    : options.max
    ? (observationsWithPositionalAccuracy = data.results.filter(
        (object) => object.positional_accuracy <= options.max
      ))
    : (observationsWithPositionalAccuracy = data.results);

  return observationsWithPositionalAccuracy;
}

/*******************************************************************************
 * Problem 06: getTaxonPhotos()
 *
 * Write function to get all sizes of the default photo for each of the identified
 * species in the iNaturalist result data.
 *
 * When an observation has been properly identified, it will have a `taxon`
 * property and value.  When it does, one of the properties within `taxon` is
 * the `default_photo` property, which will look like this:
 *
 * default_photo: {
 *   square_url: 'https://static.inaturalist.org/photos/575727/square.jpg?1384377507',
 *   attribution: '(c) hobiecat, some rights reserved (CC BY-NC)',
 *   flags: [],
 *   medium_url: 'https://static.inaturalist.org/photos/575727/medium.jpg?1384377507',
 *   id: 575727,
 *   license_code: 'cc-by-nc',
 *   original_dimensions: { width: 1035, height: 1035 },
 *   url: 'https://static.inaturalist.org/photos/575727/square.jpg?1384377507'
 * },
 *
 * Each image on iNatrualist is stored in various sizes: small, medium, large,
 * original, and square (75 x 75 pixels).  This is helpful when showing the image
 * at different sizes, to save on bandwidth when downloading.
 *
 * Convert each observation with a `taxon` identification to an Object that looks
 * like this, using the default_photo and url properties:
 *
 * {
 *   original: 'https://static.inaturalist.org/photos/575727/original.jpg',
 *   square: 'https://static.inaturalist.org/photos/575727/square.jpg',
 *   small: 'https://static.inaturalist.org/photos/575727/small.jpg',
 *   medium: 'https://static.inaturalist.org/photos/575727/medium.jpg',
 *   large: 'https://static.inaturalist.org/photos/575727/large.jpg',
 * }
 *
 * The URLs all follow the same pattern:
 *
 * https://static.inaturalist.org/photos/[photo ID]/[size].jpg
 *
 * Your function should return the new Array of photo size Objects
 ******************************************************************************/
function getTaxonPhotos(data) {
  let photoSizeObjects = [];

  //let photoSizeObjects = data.results.map((object) => {
  data.results.forEach((object) => {
    if (object.taxon && object.taxon.default_photo) {
      photoSizeObjects.push({
        original: `https://static.inaturalist.org/photos/@${object.taxon.default_photo.id}/original.jpg`,
        square: `https://static.inaturalist.org/photos/@${object.taxon.default_photo.id}/square.jpg`,
        small: `https://static.inaturalist.org/photos/@${object.taxon.default_photo.id}/small.jpg`,
        medium: `https://static.inaturalist.org/photos/@${object.taxon.default_photo.id}/medium.jpg`,
        large: `https://static.inaturalist.org/photos/@${object.taxon.default_photo.id}/large.jpg`
      });
    }
  });
  return photoSizeObjects;
}

/*******************************************************************************
 * Problem 07: getUserStats()
 *
 * Write function to get user statistics for iNaturalist users in the data results
 * Array.  Each user has count information, for example:
 *
 * {
 *   user: {
 *     id: 216168,
 *     login: 'psweet',
 *     spam: false,
 *     suspended: false,
 *     created_at: '2016-04-13T21:54:34+00:00',
 *     login_autocomplete: 'psweet',
 *     login_exact: 'psweet',
 *     name: '',
 *     name_autocomplete: '',
 *     orcid: null,
 *     icon: 'https://static.inaturalist.org/attachments/users/icons/216168/thumb.jpg?1478731222',
 *     observations_count: 19096,
 *     identifications_count: 173355,
 *     journal_posts_count: 8,
 *     activity_count: 192459,
 *     species_count: 4960,
 *     universal_search_rank: 19096,
 *     roles: ['curator'],
 *     site_id: 1,
 *     icon_url: 'https://static.inaturalist.org/attachments/users/icons/216168/medium.jpg?1478731222'
 *   }
 * }
 *
 * In the above example data, the user has the following counts that we are
 * interested in collecting:
 *
 * observations_count: 19096,            // number of observations
 * identifications_count: 173355,        // number of identifications
 * species_count: 4960,                  // number of species
 *
 * Your function should loop through all observation Objects and get the `user`
 * property.  Using the `user`, get the observations_count, identifications_count,
 * and species_count, and use them to create totals and a final average.  Your
 * function should return an Object with these stats, which looks like this:
 *
 * {
 *   count: 10,                         // the total number of users in this sample
 *   totals: {
 *     observations: 1234,              // the total observations for all users in this sample
 *     identifications: 1234,           // the total identifications for all users in this sample
 *     species: 1234                    // the total species for all users in this sample
 *   },
 *   averages: {
 *     observations: 12,                // the average observations for all users in this sample
 *     identifications: 12,             // the average identifications for all users in this sample
 *     species: 12                      // the average species for all users in this sample
 *   }
 * }
 ******************************************************************************/
function getUserStats(data) {
  let totalUsers = 0;
  let totalObservations = 0;
  let totalIdentifications = 0;
  let totalSpecies = 0;

  data.results.forEach((object) => {
    if (object.user) {
      totalUsers += 1;
      totalObservations += object.user.observations_count;
      totalIdentifications += object.user.identifications_count;
      totalSpecies += object.user.species_count;
    }
  });

  let newObject = {
    count: totalUsers,
    totals: {
      observations: totalObservations,
      identifications: totalIdentifications,
      species: totalSpecies
    },
    averages: {
      observations: totalObservations / totalUsers,
      identifications: totalIdentifications / totalUsers,
      species: totalSpecies / totalUsers
    }
  };
  return newObject;
}

// Our unit test files need to access the functions we defined
// above, so we export them here.
exports.getResults = getResults;
exports.observationSummary = observationSummary;
exports.observationSummary2 = observationSummary2;
exports.observationsByGeoPrivacy = observationsByGeoPrivacy;
exports.transformObservation = transformObservation;
exports.transformObservations = transformObservations;
exports.transformObservations2 = transformObservations2;
exports.getObservationsById = getObservationsById;
exports.getObservationsByPositionalAccuracy = getObservationsByPositionalAccuracy;
exports.getTaxonPhotos = getTaxonPhotos;
exports.getUserStats = getUserStats;
