const express = require('express');
const mongoose = require('mongoose');
const passport = require("passport");
const users = require("./routes/api/users");
const path = require("path");

const app = express();

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(
    db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(express.static("ui/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "ui", "build", "index.html"));
});

// ROUTES:
app.use("/api/users", users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server live on port: ${port}`));