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
  },

  getAllUsers: (req, res) => {
    const db = app.get("db");
    db.query(`SELECT * FROM users WHERE EMAIL='${req.body.email}'`)
      .then(results => {
        res.send(results[0]);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  },

  resetPass: async (req, res) => {
    try {
      const db = req.app.get("db");

      const updatedUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        newPass: req.body.newPass
      };

      const hash = await bcrypt.hash(updatedUser.newPass, 10);

      await db.query(`UPDATE users SET password = '${hash}' WHERE users.first_name = '${
        updatedUser.first_name
      }' AND users.last_name = '${updatedUser.last_name}'
      AND users.email = '${updatedUser.email}'`);

      res.send(
        `Password for email ${updatedUser.email} has been changed to ${
          updatedUser.newPass
        }`
      );
      delete updatedUser.newPass;
    } catch (error) {
      res.status(500).send(error);
    }
  }
};
