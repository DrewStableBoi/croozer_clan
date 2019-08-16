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
        password: hash,
        friend_list: "yes",
        time_of_signup: `NOW()`
      });

      delete newUser.password;

      res.send(newUser);
    } catch {
      console.log(error);
      res.status(500).send(error);
    }
  },

  accountCustomized: async (req, res) => {
    try {
      const db = req.app.get("db");
      const query = `UPDATE users
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
      WHERE email = '${req.session.user.email}'`;

      console.log(query);

      const account = await db.query(query);

      res.send(account);
    } catch (error) {
      console.log(error);
      res.status(500).send("Oops. Something didn't happen right!");
    }
  },

  login: async (req, res) => {
    console.log("hit login, heres body", req.body);
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
      console.log("here is user", user);
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

  Search: (req, res) => {
    console.log(req.query);
    const db = req.app.get("db");
    const { type, name } = req.query; // whatever they typed in
    const query = `SELECT id, email, display_name, first_name||' '||last_name as full_name, display_name FROM "users" WHERE users."${type}" @> ARRAY['${name}']`;
    db.query(query)
      .then(users => {
        res.status(200).send(users);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  sendMessage: (req, res) => {
    const db = req.app.get("db");
    const { userMessage, messageSubject, recipientId, senderId } = req.body;
    const message = `INSERT INTO user_messages("recipient_id", "sender_id", "message_body", "message_subject", "time_of_message") VALUES
    (
    ${recipientId},
    ${senderId},
    $$${userMessage}$$,
    $$${messageSubject}$$,
    NOW() 
    );`;
    console.log(message);
    db.query(message)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  addFriend: (req, res) => {
    const db = req.app.get("db");
    const {
      user_id,
      friend_id,
      user_email,
      friend_email,
      user_display,
      friend_display
    } = req.body;
    const query = `INSERT INTO users_friend("user_id", "friend_id", "user_email", "friend_email", "user_display", "friend_display", "request_approved", "time_of_addition") VALUES
    (
    ${user_id},
    ${friend_id},
    '${user_email}',
    '${friend_email}',
    '${user_display}',
    '${friend_display}',
    false,
    NOW()
    );`;
    console.log(query);
    db.query(query)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getMessages: (req, res) => {
    const db = req.app.get("db");
    const query = `SELECT u.display_name as sender_name, u.first_name || ' ' || u.last_name as sender_full_name, message_subject, message_body, time_of_message FROM 
    user_messages um JOIN users u ON u.id = um.sender_id WHERE recipient_id = ${req.query.id}`;
    console.log(query);
    db.query(query)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(500).send(err);
        console.log(err);
      });
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
