const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const covidDataSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  PatientNumber: {
    type: Number,
  },
  StatePatientNumber: {
    type: String,
  },
  DateAnnounced: {
    type: String,
  },
  EstimatedOnsetDate: {
    type: String,
  },
  AgeBracket: {
    type: Number,
  },
  Gender: {
    type: String,
  },
  DetectedCity: {
    type: String,
  },
  DetectedDistrict: {
    type: String,
  },
  DetectedState: {
    type: String,
  },
  StateCode: {
    type: String,
  },
  CurrentStatus: {
    type: String,
  },
  Notes: {
    type: String,
  },
  ContractedFromWhichPatientSuspected: {
    type: String,
  },
  Nationality: {
    type: String,
  },
  TypeOfTransmission: {
    type: String,
  },
  StatusChangeDate: {
    type: String,
  },
  Source_1: {
    type: String,
  },
  Source_2: {
    type: String,
  },
  Source_3: {
    type: String,
  },
  BackupNotes: {
    type: String,
  },
  NumCases: {
    type: Number,
  },
});
const covidData = mongoose.model("CovidData", covidDataSchema, "CovidData");

module.exports = {
  covidData,
};
