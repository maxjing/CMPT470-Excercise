var express = require("express");
const mongoose = require("mongoose");

var router = express.Router();
const User = require("../models/User");

router.get("/", function (req, res, next) {
  User.find()
    .then((docs) => {
      const response = {
        count: docs.length,
        users: docs.map((doc) => {
          return {
            firstName: doc.firstName,
            lastName: doc.lastName,
            _id: doc._id,
          };
        }),
      };
      console.log(docs);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
});

router.get("/:id", function (req, res, next) {
  console.log(req.params.id);
  User.findById(req.params.id)
    .then((doc) => {
      const response = {
        user: {
          firstName: doc.firstName,
          lastName: doc.lastName,
          email: doc.email,
          phoneNumber: doc.phoneNumber,
          notes: doc.notes,
          _id: doc._id,
        },
      };
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
});

router.post("/:id", function (req, res, next) {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  });
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    notes: req.body.notes,
  });
  console.log(user);
  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "User Created",
        User: {
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          phoneNumber: result.phoneNumber,
          notes: result.notes,
          _id: result._id,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
});
module.exports = router;
