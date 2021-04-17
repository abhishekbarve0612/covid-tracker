const {
  getData,
  getDataByAge,
  getDataByGender,
  getDataByState,
  getDataByStatus,
  getDistinctStates,
  getAllStatus,
} = require("../controllers/covidController");

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.json({ message: "APIs can be found here!!" });
  });
  app.route("/data").get((req, res, next) => {
    console.log(`Request from ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    next();
  }, getData);

  app.route("/allStates").get((req, res, next) => {
    next();
  }, getDistinctStates);

  app.route("/allStatus").get((req, res, next) => {
    next();
  }, getAllStatus);
  app.route("/state/:state").get((req, res, next) => {
    console.log(`Request from ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    next();
  }, getDataByState);

  app.route("/gender/:gender").get((req, res, next) => {
    console.log(`Request from ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    next();
  }, getDataByGender);

  app.route("/age/:age").get((req, res, next) => {
    console.log(`Request from ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    next();
  }, getDataByAge);

  app.route("/status/:status").get((req, res, next) => {
    console.log(`Request from ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    next();
  }, getDataByStatus);
};

module.exports = routes;
