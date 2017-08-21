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

//PeopleDetail Type from ppl-detail-models
module.exports.PeopleDetail = PeopleDetail = require('../../models/people-detail-model');
module.exports.PeopleDetailCompose = PeopleDetailCompose = graphqlComposeMongoose.composeWithMongoose(PeopleDetail, {});
module.exports.PeopleDetailType = PeopleDetailType = PeopleDetailCompose.getType();

//Query
module.exports.PeopleDetailQuery = PeopleDetailQuery = {
    people_detail_all: {
        type: new GraphQLList(PeopleDetailType),
        resolve(parentValue, args){
            return PeopleDetail.find({}).exec();
        }
    },
    people_detail: {
        type: PeopleDetailType,
        args: {
            peopleId: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parentValue, args){
            return PeopleDetail .findOne({peopleId: args.peopleId})
                                .exec();
        }
    },
    specific_detail: {
        type: PeopleDetailType,
        args: {
            peopleId: {type: new GraphQLNonNull(GraphQLString)},
            detailId: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parentValue, args) {
            return PeopleDetail.findOne(
                                    { peopleId: args.peopleId }, 
                                    { details: { $elemMatch: { _id: args.detailId }} }
                                )
                                .exec();
        }
    }
};

//mutations
module.exports.PeopleDetailMutation = PeopleDetailMutation = {
    detail_add: {
        type: PeopleDetailType,
        args: {
            peopleId: {type: new GraphQLNonNull(GraphQLString)},
            detailBody: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parentValue, args){
            return PeopleDetail.AddDetailToPeople(args.peopleId, args.detailBody);
        }
    },
    detail_remove: {
        type: PeopleDetailType,
        args: {
            peopleId: {type: new GraphQLNonNull(GraphQLString)},
            detailId: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parentValue, args){
            return PeopleDetail.RemoveDetailFromList(args.peopleId, args.detailId);
        }
    },
    people_detail_remove: {
        type: PeopleDetailType,
        args: {
            peopleId: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parentValue, args){
            return PeopleDetail .find({peopleId: args.peopleId})
                                .remove()
                                .exec();
        }
    }
};