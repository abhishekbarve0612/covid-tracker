const { covidData } = require("../models/covidData");

const getDistinctStates = (req, res) => {
  covidData.distinct("DetectedState", (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

const getAllStatus = (req, res) => {
  covidData.distinct("CurrentStatus", (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

const getData = (req, res) => {
  let obj = {};
  if (!["", undefined, NaN].includes(req.query["DetectedState"]))
    obj.DetectedState = req.query["DetectedState"];
  if (!["", undefined, NaN].includes(req.query["Gender"]))
    obj.Gender = req.query["Gender"];
  if (!["", undefined, NaN].includes(req.query["CurrentStatus"]))
    obj.CurrentStatus = req.query["CurrentStatus"];
  if (
    !["", undefined, NaN].includes(req.query["FromDate"]) &&
    !["", undefined, NaN].includes(req.query["ToDate"])
  )
    obj.StatusChangeDate = {
      $gte: req.query["FromDate"],
      $lte: req.query["ToDate"],
    };
  if (
    !["", undefined, NaN].includes(req.query["LowerAge"]) &&
    !["", undefined, NaN].includes(req.query["UpperAge"])
  ) {
    obj.AgeBracket = {
      $lte: parseInt(req.query["UpperAge"]),
      $gte: parseInt(req.query["LowerAge"]),
    };
  }
  console.log(obj);
  covidData.find(obj, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

const getDataByState = (req, res) => {
  covidData.find({ StateCode: req.params.state }).limit(10, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

const getDataByAge = (req, res) => {
  covidData.find({ AgeBracket: req.params.age }, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

const getDataByGender = (req, res) => {
  covidData.find({ Gender: req.params.gender }, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};
const getDataByStatus = (req, res) => {
  covidData.find({ CurrentStatus: req.params.status }, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

module.exports = {
  getData,
  getDataByAge,
  getDataByState,
  getDataByGender,
  getDataByStatus,
  getDistinctStates,
  getAllStatus,
};
