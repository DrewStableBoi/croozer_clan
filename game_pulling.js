let axios = require("axios");
let _ = require("lodash");
let fs = require("fs");
let API_KEY = "e8e22519b15fbe8b5e858e89350b6509";
let REQUEST_LIMIT = 50;
let BASE_URL = "https://api-v3.igdb.com";

function buildRequestOptions(endpoint, fields, offset) {
  return {
    url: `${BASE_URL}/${endpoint}`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "user-key": API_KEY
    },
    data: `fields ${fields}; limit ${REQUEST_LIMIT}; offset ${offset};`
  };
}

function getAllData(endpoint, fields, offset,  allData = []) {
  let options = buildRequestOptions(endpoint, fields, offset);
  return axios(options)
    .then(response => {
      allData = _.concat(allData, response.data);
      if (_.size(response.data) === REQUEST_LIMIT && _.size(allData) <= 150) {
        // ask for the next page of results
        return getAllData(endpoint, fields, _.size(allData), allData);
      }
      return allData;
    })
    .catch(err => {
      console.error(err);
    });
}

// request for games endpoint
let gamesEndpoint = "games";
let gamesFields =
  "created_at,first_release_date,game_modes,genres,multiplayer_modes,name,platforms,release_dates,summary,updated_at,url";

//use csv-writer to write the result of the API call to a .csv file

const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "games.csv",
  header: [
    { id: "created_at", title: "created_in_db" },
    { id: "first_release_date", title: "release_date" },
    { id: "game_modes", title: "game_modes" },
    { id: "genres", title: "genres" },
    { id: "multiplayer_modes", title: "multiplayer_modes" },
    { id: "name", title: "game_name" },
    { id: "platforms", title: "platforms" },
    { id: "release_dates", title: "release_dates" },
    { id: "summary", title: "game_summary" },
    { id: "url", title: "game_url" }
  ]
});

getAllData(gamesEndpoint, gamesFields, 0)
  .then(games => {
    csvWriter
      .writeRecords(games)
      .then(() => console.log("The CSV file was written successfully"));
  })
  .catch(err => {
    console.log(err);
  });
