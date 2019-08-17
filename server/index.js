const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const controller = require("./controllers/controller");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());

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
app.post("/logout", controller.logout);
app.get("/user", controller.getUser);
app.delete("/user/:id", controller.deleteUser);
app.post("/users/all", controller.getAllUsers);
app.put("/resetpass", controller.resetPass);
app.post("/firsttime", controller.accountCustomized);
app.get("/search", controller.Search);
app.post("/sendMessage", controller.sendMessage);
app.post("/addFriend", controller.addFriend);
app.get("/getMessages", controller.getMessages)
app.delete("/message/:id", controller.deleteMessage);
app.get("/getEvents", controller.getEvents)

app.get("/me", (req, res) => {
  res.send(req.session.user);
})

app.listen(8080, function() {
  console.log(`Listening on port:${this.address().port}`);
});
