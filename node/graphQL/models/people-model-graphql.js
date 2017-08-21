const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInputObjectType
} = require('graphql');
const graphqlComposeMongoose = require('graphql-compose-mongoose');

//People Type from people-models
module.exports.People = People = require("../../models/people-model");
module.exports.PeopleCompose = PeopleCompose = graphqlComposeMongoose.composeWithMongoose(People, {});
module.exports.PeopleType = PeopleType = PeopleCompose.getType();

//graphql query
module.exports.PeopleQuery = PeopleQuery = {
    people: {
        type: new GraphQLList(PeopleType),
        resolve(parentValue, args){
            return People.find({}).exec();
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
};

//graphql mutation
module.exports.PeopleMutation = PeopleMutation = {
    people_add:{
        type: PeopleType,
        args:{
            firstName: {type: new GraphQLNonNull(GraphQLString)},
            lastName: {type: new GraphQLNonNull(GraphQLString)},
            DOB: {type: new GraphQLNonNull(PeopleCompose.get('DOB').getInputType())}
        },
        resolve(parentValue, args){
            let newPeople = new People({
                firstName: args.firstName,
                lastName: args.lastName,
                DOB: args.DOB
            });
            return newPeople.save();
        }
    },
    people_add_object:{
        type: PeopleType,
        args:{
            newPeople: {type: new GraphQLNonNull(PeopleCompose.getInputType())}
        },
        resolve(parentValue, args){
            let newPeople = new People(args.newPeople);
            return newPeople.save();
        }
    },
    people_remove:{
        type: PeopleType,
        args:{
            _id: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parentValue, args){
            return People   .find({_id: args._id})
                            .remove()
                            .exec();
        }
    }
};