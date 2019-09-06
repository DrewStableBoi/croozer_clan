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

      const authenticated = await bcrypt.compare(password, user.password);
      console.log(authenticated);

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
    const db = req.app.get("db");
    const { item, userId } = req.query; // whatever they typed in
    const query = `SELECT id, email, display_name, first_name||' '||last_name as full_name, display_name FROM "users" WHERE (users.activities_first @> ARRAY['${item}'] OR users.activities_second @> ARRAY['${item}'] OR users.activities_third @> ARRAY['${item}']) AND id <> ${userId}`;
    console.log(query);
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
    const query = `INSERT INTO users_friend("requester_id", "friend_id", "requester_email", "friend_email", "requester_display", "friend_display", "request_approved", "time_of_addition", request_denied) VALUES
    (
    ${user_id},
    ${friend_id},
    '${user_email}',
    '${friend_email}',
    '${user_display}',
    '${friend_display}',
    FALSE,
    NOW(),
    FALSE
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
    const query = `SELECT u.display_name as sender_name, sender_id, u.first_name || ' ' || u.last_name as sender_full_name, message_subject, message_body, message_id, time_of_message FROM 
    user_messages um JOIN users u ON u.id = um.sender_id WHERE recipient_id = ${
      req.query.id
    }`;
    db.query(query)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(500).send(err);
        console.log(err);
      });
  },

  getEvents: (req, res) => {
    const db = req.app.get("db");
    const query = `WITH first_query AS 
    (
    SELECT u.display_name as sender_name, ue.event_id, ue.challenger_id, ue.accepter_id, u.first_name || ' ' || u.last_name as challenger_full_name, ue.event_description, ue.day_of_event, ue.event_category, ue.event_arena, ue.event_activity, ue.event_finished, ue.challenger_win, ue.accepter_win FROM 
    user_events ue JOIN users u ON u.id = ue.challenger_id WHERE (accepter_id = 
    ${req.query.id}
    OR challenger_id =  ${req.query.id}) AND event_finished = FALSE
    )
    SELECT fq.*, u.first_name || ' ' || u.last_name as accepter_full_name
    FROM
    users u
    JOIN first_query fq ON u.id = fq.accepter_id;`;
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

  getFinishedEvents: (req, res) => {
    const db = req.app.get("db");
    const query = `WITH first_query AS 
    (
    SELECT u.display_name as sender_name, ue.event_id, ue.challenger_id, ue.accepter_id, u.first_name || ' ' || u.last_name as challenger_full_name, ue.event_description, ue.day_of_event, ue.event_category, ue.event_arena, ue.event_activity, ue.event_finished, ue.challenger_win, ue.accepter_win FROM 
    user_events ue JOIN users u ON u.id = ue.challenger_id WHERE (accepter_id = 
    ${req.query.id}
    OR challenger_id =  ${req.query.id}) AND event_finished = TRUE
    )
    SELECT fq.*, u.first_name || ' ' || u.last_name as accepter_full_name
    FROM
    users u
    JOIN first_query fq ON u.id = fq.accepter_id;`;
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

  wonEvent: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const query = `UPDATE user_events SET challenger_win = TRUE, accepter_win = FALSE, event_finished = TRUE WHERE event_id = ${id};`;
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

  lostEvent: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const query = `UPDATE user_events SET challenger_win = FALSE, accepter_win = TRUE, event_finished = TRUE WHERE event_id = ${id};`;
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

  deleteMessage: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const query = `DELETE FROM user_messages WHERE message_id = ${id}`;
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

  deleteEvent: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const query = `DELETE FROM user_events WHERE event_id = ${id}`;
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
  },

  scheduleEvent: (req, res) => {
    const db = req.app.get("db");
    const {
      challenger_id,
      accepter_id,
      event_description,
      day_of_event,
      event_category,
      event_arena,
      event_activity
    } = req.body;

    const query = `INSERT INTO user_events ("challenger_id", "accepter_id", "event_description", 
    "event_category", "event_arena", "event_activity", 
    "day_of_event", "event_finished", "created_at", challenger_win, accepter_win) VALUES
    (
      ${challenger_id},
      ${accepter_id},
      $$${event_description}$$,
      $$${event_category}$$,
      $$${event_arena}$$,
      $$${event_activity}$$,
      $$${day_of_event}$$,
      false,
      NOW(),
      false,
      false
    );`;
    console.log(query);
    db.query(query)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  getUserFriends: (req, res) => {
    const db = req.app.get("db");
    const id = req.query.id;
    const query = `WITH friend_search AS
    (
    SELECT DISTINCT 
    CASE WHEN requester_id = ${id} AND request_approved IS TRUE THEN friend_display
    WHEN friend_id = ${id} AND request_approved IS TRUE THEN requester_display ELSE NULL END as app_friend_display,
    CASE WHEN requester_id = ${id} AND request_approved IS TRUE THEN friend_id
    WHEN friend_id = ${id} AND request_approved IS TRUE THEN requester_id ELSE NULL END as app_friend_id
    FROM users_friend
    )
    SELECT * FROM friend_search
    WHERE app_friend_display IS NOT NULL;
    `;
    console.log(query);
    db.query(query)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  getFriendRequests: (req, res) => {
    const db = req.app.get("db");
    const id = req.query.id;
    const query = `SELECT DISTINCT request_id, requester_id, friend_id, requester_email, 
    friend_email, requester_display, friend_display, time_of_addition, u.first_name || ' ' || u.last_name as requester_full_name FROM
    users_friend 
    JOIN users u ON users_friend.requester_id = u.id 
    WHERE friend_id = ${id} AND request_approved IS FALSE AND request_denied = FALSE;`;
    console.log(query);
    db.query(query)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  deleteFriendRequest: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const query = `DELETE FROM users_friend WHERE request_id = ${id}`
    console.log(query)
    db.query(query)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  approveRequest: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const query = `UPDATE users_friend SET request_approved = TRUE, request_denied = FALSE 
    WHERE request_id = ${id}`;
    console.log(query);
    db.query(query)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  denyRequest: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const query = `UPDATE users_friend SET request_approved = FALSE, request_denied = TRUE 
    WHERE request_id = ${id}`;
    console.log(query);
    db.query(query)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  getEventDays: (req, res) => {
    const db = req.app.get("db");
    const id = req.query.id;
    const query = `SELECT day_of_event FROM user_events WHERE challenger_id = ${id} OR accepter_id = ${id}`;
    console.log(query);
    db.query(query)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  getRecord: (req, res) => {
    const db = req.app.get("db");
    const id = req.query.id;
    const query = 
    `
    WITH finally AS 
    (
    WITH almost AS 
    (
    WITH staging_counts AS 
    (
    WITH staging AS 
    (
    SELECT CASE WHEN challenger_id = ${id} AND challenger_win = TRUE THEN 1 ELSE 0 END as first_win,
    CASE WHEN challenger_id = ${id} AND challenger_win = FALSE THEN 1 ELSE 0 END as first_loss,
    CASE WHEN accepter_id = ${id} AND accepter_win = TRUE THEN 1 ELSE 0 END as second_win,
    CASE WHEN accepter_id = ${id} AND accepter_win = FALSE THEN 1 ELSE 0 END as second_loss
    FROM
    user_events WHERE user_events.challenger_id = ${id} OR user_events.accepter_id = ${id}
    )
    SELECT * FROM staging s
    )
    SELECT sc.first_win::numeric + sc.second_win::numeric AS total_wins, sc.first_loss::numeric + sc.second_loss::numeric AS total_losses
    FROM
    staging_counts sc
    )
    SELECT SUM(a.total_wins) OVER () as total_wins, SUM(a.total_losses) OVER () as total_losses
    FROM
    almost a
    )
    SELECT DISTINCT f.total_wins, f.total_losses
    FROM
    finally f
    `;
    console.log(query);
    db.query(query)
      .then(result => {
        res.status(200).send(result[0]);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  }
};
