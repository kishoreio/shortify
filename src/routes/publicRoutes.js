const express = require("express");
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
// const url = "mongodb://localhost:27017";
const url =
  "mongodb+srv://kishore:admin@cluster0-lwvuq.mongodb.net/test?retryWrites=true&w=majority";
const randomString = require("randomstring");

router.post("/", (req, res) => {
  mongoClient.connect(url, (err, client) => {
    if (err) throw err;
    var db = client.db("shortifyDB");
    let shortUrl = randomString.generate({
      length: 7,
      charset: "alphabetic",
    });
    db.collection("publicLinks")
      .findOne({ shortUrl })
      .then((isValid) => {
        db.collection("publicLinks")
          .insertOne({ longUrl: req.body.link, shortUrl })
          .then((result) => {
            res.status(200).send(`https://short-fy.herokuapp.com/${shortUrl}`);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.get("/:id", (req, res) => {
  mongoClient.connect(url, (err, client) => {
    if (err) throw err;
    var db = client.db("shortifyDB");
    db.collection("publicLinks")
      .findOne({ shortUrl: req.params.id })
      .then((result) => {
        if (result !== null) {
          // db.collection("privateLinks")
          //   .update(
          //     { _id: ObjectID("5e8592d3ce6c2e62c0ef6f6d") },
          //     { $inc: { click: 1 } }
          //   )
          //   .then(() => {
          //     res.redirect(result.longUrl);
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
          res.redirect(result.longUrl);
        } else {
          res.status(404).send("Link not found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
module.exports = router;
