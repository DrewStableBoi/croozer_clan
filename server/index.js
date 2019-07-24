const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const bcrypt = require("bcrypt");
const controller = require("./controllers/controller");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());

massive({
  host: "localhost",
  port: 5000,
  database: "drewhemsley",
  user: "drewhemsley",
  password: ""
}).then(db => {
  console.log("PostgreSQL Database Successfully Connected");

  app.set("db", db);

});

app.use(
  session({
    secret: "keyboard cat",
    maxAge: 86400000,
    resave: true,
    saveUninitialized: true
  })
);

app.post("/signup", controller.signUp);
app.post("/login", controller.login);
app.get("/logout", controller.logout);
app.get("/user", controller.getUser);
app.delete("/user/:id", controller.deleteUser);

app.post("/users/all", (req, res) => {
  const db = app.get('db');
  db.query(`SELECT * FROM users WHERE EMAIL='${req.body.email}'`)
  .then((results) => {
      res.send(results[0]);
  }).catch((error) => {
    res.status(500).send(error)
  });
})


app.listen(8080, function() {
  console.log(`Listening on port:${this.address().port}`);
});
