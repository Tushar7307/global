const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const express = require("express");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const router = express.Router();


router.post("/", async (req, res) => {
  const result = validate(req.body)
  if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).send({ message: "user is already registered" });
    return;
  }
  user = await new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
 

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.send(user);
});

module.exports = router;
