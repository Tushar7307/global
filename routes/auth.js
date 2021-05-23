const mongoose = require("mongoose");
const Joi = require('joi');
const bcrypt = require("bcrypt");
const express = require("express");
const {User} = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send({ message: "Invalid email or password" });
    return;
  }

  const validpassword = await bcrypt.compare(req.body.password, user.password);
  if (!validpassword) {
    res.status(400).send({ message: "Invalid email or password" });
    return;
  }
  res.send(user);
});

module.exports = router;
