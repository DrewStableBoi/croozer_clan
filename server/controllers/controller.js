const express = require("express");
const bcrypt = require("bcrypt");

module.exports = {
  signUp: async (req, res) => {
    try {
      const db = req.app.get("db");

      const hash = await bcrypt.hash(req.body.password, 10);

      const newUser = await db.users.insert({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hash
      });

      delete newUser.password;

      res.send(newUser);
    } catch {
      res.status(500).send(error);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).send("Please enter email and password");

      const db = req.app.get("db");

      const [user] = await db.users.find({ email });

      if (!user)
        return res
          .status(400)
          .send(
            "The user does not exist. Please enter a valid email and password"
          );

      const authenticated = bcrypt.compare(password, user.password);

      if (!authenticated) {
        return res.status(400).send("Please authenticate!");
      }
      delete user.password;
      req.session.user = user;

      return res.send("Successfully logged in!");
    } catch (error) {
      console.log(error);
    }
  },

  logout: (req, res) => {
    return req.session.destroy(err => res.send("Successfully logged out"));
  },

  getUser: (req, res) => {
    if (!req.session.user) return res.status(401).send("Please log in");
    return res.send(req.session.user);
  },

  deleteUser: (req, res) => {
    if (!req.session.user) return res.status(401).send("Please log in");
    const db = req.app.get("db");
    db.users
      .destroy({ id: req.params.id })
      .then(result => {
        return res.send(result);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  }
};
