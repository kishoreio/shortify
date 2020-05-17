const express = require("express");
const router = express.Router();
const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;
// const url = "mongodb://localhost:27017";
const url =
  "mongodb+srv://kishore:admin@cluster0-lwvuq.mongodb.net/test?retryWrites=true&w=majority";
const ObjectID = mongo.ObjectID;
const randomString = require("randomstring");
let userID = null;
const jwt = require("jsonwebtoken");

function authorization(req, res, next) {
  var incomingToken = req.header("Authorization");
  jwt.verify(incomingToken, "dhdhdhdhhdjfdsjfhdjfdshk", (err, decoded) => {
    if (decoded !== undefined) {
      userID = decoded.id;
      next();
    } else {
      res.status(401).send("User not authorized");
    }
  });
}

router.get("/links", authorization, (req, res) => {
  mongoClient.connect(url, (err, client) => {
    var db = client.db("shortifyDB");
    db.collection("privateLinks")
      .findOne({ _id: ObjectID(userID) })
      .then((result) => {
        if (result !== null) {
          res.send(result);
        } else {
          db.collection("privateLinks")
            .insertOne({ _id: ObjectID(userID), links: [] })
            .then(() => {
              db.collection("privateLinks")
                .findOne({ _id: ObjectID(userID) })
                .then((data) => {
                  res.send(data);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send("Service unavailable");
        console.log(err);
      });
  });
});

router.post("/delete/links", authorization, (req, res) => {
  mongoClient.connect(url, (err, client) => {
    var db = client.db("shortifyDB");
    var result = db
      .collection("privateLinks")
      .update(
        { _id: ObjectID(userID) },
        { $pull: { links: { shortUrl: req.body.urlLinkId } } }
      );
    result
      .then((data) => {
        if (data !== null) {
          db.collection("privateLinks")
            .findOne({
              _id: ObjectID(userID),
            })
            .then((result) => {
              res.send(result);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send("Service unavailable");
        console.log(err);
      });
  });
});

router.post("/add/links", authorization, (req, res) => {
  mongoClient.connect(url, (err, client) => {
    var db = client.db("shortifyDB");
    let link = randomString.generate({
      length: 7,
      charset: "alphabetic",
    });
    var result = db.collection("privateLinks").update(
      { _id: ObjectID(userID) },
      {
        $push: {
          links: {
            longUrl: req.body.link,
            shortUrl: link,
            click: 0,
            date: req.body.date,
          },
        },
      }
    );
    result
      .then((data) => {
        if (data !== null) {
          db.collection("publicLinks")
            .insertOne({ longUrl: req.body.link, shortUrl: link, click: 0 })
            .then(() => {
              db.collection("privateLinks")
                .findOne({
                  _id: ObjectID(userID),
                })
                .then((result) => {
                  res.json({
                    result,
                    shortUrl: `https://short-fy.herokuapp.com/${link}`,
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send("Service unavailable");
        console.log(err);
      });
  });
});

module.exports = router;
