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
 
  accountCustomized: async (req, res) => {
    try {
      const db = req.app.get("db");
      console.log(req.session.user);
      const account = await db.query(`UPDATE users
      SET "display_name" = '${req.body.displayName}',
      "birthday" = '${req.body.birthday}',
      "clan_tag" = '${req.body.clanTag}',
      activities_first = ARRAY[${req.body.activities_first.map(results => {
        return `'` + results + `'`;
      })}],
      activities_second = ARRAY[${req.body.activities_second.map(results => {
        return `'` + results + `'`;
      })}],
      activities_third = ARRAY[${req.body.activities_third.map(results => {
        return `'` + results + `'`;
      })}],
      times_active = ARRAY[${req.body.preferredTimes.map(results => {
        return `'` + results + `'`;
      })}]
      WHERE email = '${req.session.user.email}'`);
      res.send(account);
    } catch (error) {
      console.log(error);
      res.status(500).send("Oops. Something didn't happen right!");
    }
  },

  login: async (req, res) => {
    console.log('hit login, heres body', req.body)
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
      console.log('here is user', user)
      return res.status(200).send(user);
    } catch (error) {
      console.log(error);
    }
  },

  logout: (req, res) => {
    return req.session.destroy(err => res.send("Successfully logged out"));
  },

  getUser: (req, res) => {
    if (!req.session.user) return res.sendStatus(401);
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
