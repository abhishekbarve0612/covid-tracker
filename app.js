const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/covidRoutes");
const bodyParser = require("body-parser");

const app = express();

// allow cross-origin requests
app.use(cors());
const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  "mongodb+srv://abhishekbarve:D2zFIprGF8e7S8Q6@cluster0.zkn7s.mongodb.net/covidTracker?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
mongoose.connect(encodeURI(MONGODB_URI), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) => {
  console.error(`Mongoose connection error: ${err}`);
  process.exit(1);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      "ASecretWord",
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

routes(app);

app.route("/").get((req, res) => {
  res.send(`App running on server ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
