let axios = require('axios');
let _ = require('lodash');
let fs = require('fs');
let API_KEY = 'e8e22519b15fbe8b5e858e89350b6509';
let REQUEST_LIMIT = 50;
let BASE_URL = "https://api-v3.igdb.com";
let massive = require("massive");

massive({
  host: "localhost",
  port: 5432,
  database: "drewhemsley",
  user: "drewhemsley",
  password: ""
}).then(db => {
  console.log("PostgreSQL Database Successfully Connected");

  app.set("db", db);
});

function buildRequestOptions(endpoint, fields, offset) {
  return  {
    url: `${BASE_URL}/${endpoint}`,
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'user-key': API_KEY
    },
    data: `fields ${fields}; limit ${REQUEST_LIMIT}; offset ${offset};`
  };
}


function getAllData(endpoint, fields, allData = []) {
  let options = buildRequestOptions(endpoint, fields, _.size(allData));
  return axios(options)
  .then(response => {
      allData = _.concat(allData, response.data);
      if (_.size(response.data) === REQUEST_LIMIT && _.size(allData) < 200) {
         // ask for the next page of results
         return getAllData(endpoint, fields, allData);
      }
      return allData;
  })
  .catch(err => {
      console.error(err);
  });
}

// request for games endpoint
let gamesEndpoint = 'games';
let genresEndpoint = 'genres';
let gamesFields = 'created_at,first_release_date,follows,game_modes,genres,multiplayer_modes,name,platforms,player_perspectives,popularity,rating,rating_count,release_dates,slug,status,summary,themes,time_to_beat,updated_at,url';
let genresFields = '*';

getAllData(gamesEndpoint, gamesFields)
.then(games => {
   console.log(games);
   console.log("total:");
  console.log(_.size(games));

  //output games data into a file
  fs.writeFile('games.log', JSON.stringify(games), function (err, file) {
  if (err) throw err;
  console.log('Saved!');
});
});
