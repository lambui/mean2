const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat
} = require('graphql');

const graphqlComposeMongoose = require('graphql-compose-mongoose');
const People = require("../models/people-model");
const PeopleType = graphqlComposeMongoose.composeWithMongoose(People, {}).getType();

const axios = require('axios');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        people: {
            type: new GraphQLList(PeopleType),
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/people/all/')
                            .then(res => res.data);
            }
        },
        people_find_by_id: {
            type: PeopleType,
            args: {
                _id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return People.findOne({_id: args._id}).exec();
            }
        }
    }
});

module.exports = new GraphQLSchema({
   query: RootQuery
});