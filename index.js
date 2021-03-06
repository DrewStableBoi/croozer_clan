const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const massive = require("massive");
const controller = require("./controllers/controller");
const path = require('path');
require('dotenv').config();

app.use(bodyParser.json());

massive(process.env.DATABASE_URL).then(db => {
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

app.use(express.static(path.join(__dirname, 'build')));
 
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
app.delete("/event/:id", controller.deleteEvent)
app.delete("/request/:id", controller.deleteFriendRequest)
app.get("/getEvents", controller.getEvents);
app.get("/getFinishedEvents", controller.getFinishedEvents);
app.post("/scheduleEvent", controller.scheduleEvent);
app.get("/getUserFriends", controller.getUserFriends);
app.get("/getFriendRequests", controller.getFriendRequests);
app.post("/eventWin/:id", controller.wonEvent);
app.post("/eventLoss/:id", controller.lostEvent);
app.get("/getEventDays", controller.getEventDays);
app.post("/approve/:id", controller.approveRequest);
app.post("/deny/:id", controller.denyRequest);
app.get("/getRecord", controller.getRecord);
app.get("/me", (req, res) => {
  res.send(req.session.user);
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
})

app.listen(process.env.PORT || 8080, function() {
  console.log(`Listening on port:${this.address().port}`);
});
