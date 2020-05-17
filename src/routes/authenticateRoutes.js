const express = require("express");
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
// const url = "mongodb://localhost:27017";
const url =
  "mongodb+srv://kishore:admin@cluster0-lwvuq.mongodb.net/test?retryWrites=true&w=majority";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRound = 10;

router.post("/register", (req, res) => {
  mongoClient.connect(url, (err, client) => {
    if (err) throw err;
    var db = client.db("shortifyDB");
    db.collection("users")
      .findOne({ email: req.body.email })
      .then((isValid) => {
        if (isValid !== null) {
          res.send("Already Registered.");
        } else {
          bcrypt.genSalt(saltRound, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
              db.collection("users")
                .insertOne({
                  name: req.body.name,
                  email: req.body.email,
                  password: hashedPassword,
                })
                .then(() => {
                  res.send("Successfully Registered");
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.post("/login", (req, res) => {
  mongoClient.connect(url, (err, client) => {
    if (err) throw err;
    var db = client.db("shortifyDB");
    db.collection("users")
      .findOne({ email: req.body.email })
      .then((isValid) => {
        if (isValid !== null) {
          bcrypt.compare(
            req.body.password,
            isValid.password,
            (err, hasResult) => {
              if (hasResult === true) {
                jwt.sign(
                  {
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                    id: isValid._id,
                  },
                  "dhdhdhdhhdjfdsjfhdjfdshk",
                  (err, token) => {
                    if (err) throw err;
                    res.json({
                      name: isValid.name,
                      token,
                    });
                  }
                );
              } else {
                res.status(401).send("Invalid Password");
              }
            }
          );
        } else {
          res.status(404).send("User Not Found");
        }
      });
  });
});
module.exports = router;
