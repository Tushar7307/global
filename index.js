const mongoose = require("mongoose");
const express = require("express");
const bodyparser = require("body-parser");
const users = require("./routes/users");
const auth = require("./routes/auth");
const app = express();

mongoose
  .connect("mongodb://localhost/simple", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb is connected to server"))
  .catch((err) => console.log("mongodb could not connected to server", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(3000, () => {
  console.log("server is connected to port 3000....");
});
