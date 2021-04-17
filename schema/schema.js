const graphql = require("graphql");
const CovidData = require("../models/covidData");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const Cdata = new GraphQLObjectType({
  name: "Data",
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    PatientNumber: {
      type: GraphQLInt,
    },
    StatePatientNumber: {
      type: GraphQLString,
    },
    DateAnnounced: {
      type: GraphQLString,
    },
    EstimatedOnsetDate: {
      type: GraphQLString,
    },
    AgeBracket: {
      type: GraphQLString,
    },
    Gender: {
      type: GraphQLString,
    },
    DetectedCity: {
      type: GraphQLString,
    },
    DetectedDistrict: {
      type: GraphQLString,
    },
    DetectedState: {
      type: GraphQLString,
    },
    StateCode: {
      type: GraphQLString,
    },
    CurrentStatus: {
      type: GraphQLString,
    },
    Notes: {
      type: GraphQLString,
    },
    ContractedFromWhichPatientSuspected: {
      type: GraphQLString,
    },
    Nationality: {
      type: GraphQLString,
    },
    TypeOfTransmission: {
      type: GraphQLString,
    },
    StatusChangeDate: {
      type: GraphQLString,
    },
    Source_1: {
      type: GraphQLString,
    },
    Source_2: {
      type: GraphQLString,
    },
    Source_3: {
      type: GraphQLString,
    },
    BackupNotes: {
      type: GraphQLString,
    },
    NumCases: {
      type: GraphQLInt,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    data: {
      type: Cdata,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        return CovidData.findById(args._id);
      },
    },
    dataByState: {
      type: new GraphQLList(Cdata),
      args: { DetectedState: { type: GraphQLString } },
      resolve(parent, args) {
        let data = CovidData.find({ DetectedState: args.DetectedState });
        console.log(data.length);
        return data;
      },
    },
    getLocations: {
      type: new GraphQLList(Cdata),
      resolve(parent, args) {
        let newData = CovidData.distinct("DetectedState");
      },
    },

    allData: {
      type: new GraphQLList(Cdata),
      resolve(parent, args) {
        return CovidData.find({}).limit(10);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
