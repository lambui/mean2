const graphqlComposeMongoose = require('graphql-compose-mongoose');

//People Type from people-models
module.exports.People = People = require("../models/people-model");
module.exports.PeopleCompose = PeopleCompose = graphqlComposeMongoose.composeWithMongoose(People, {});
module.exports.PeopleType = PeopleType = PeopleCompose.getType();

//PeopleDetail Type from ppl-detail-models
module.exports.PeopleDetail = PeopleDetail = require('../models/people-detail-model');
module.exports.PeopleDetailCompose = PeopleDetailCompose = graphqlComposeMongoose.composeWithMongoose(PeopleDetail, {});
module.exports.PeopleDetailType = PeopleDetailType = PeopleDetailCompose.getType();
