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

//ALertTag Type from alert-tag-model
module.exports.AlertTag = AlertTag = require("../../models/alert-tag-model");
module.exports.AlertTagCompose = AlertTagCompose = graphqlComposeMongoose.composeWithMongoose(AlertTag, {});
module.exports.AlertTagType = AlertTagType = AlertTagCompose.getType();

//Query
module.exports.AlertTagQuery = AlertTagQuery = {
    alert_tag_all: {
        type: new GraphQLList(AlertTagType),
        resolve(parentValue, args){
            return AlertTag .find({})
                            .exec();
        }
    },
    people_alert_tag: {
        type: new GraphQLList(AlertTagType),
        args: {
            peopleId: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parentValue, args){
            return AlertTag .find({peopleId: args.peopleId})
                            .exec();
        }
    },
    detail_alert_tag: {
        type: new GraphQLList(AlertTagType),
        args: {
            peopleId: {type: new GraphQLNonNull(GraphQLString)},
            detailId: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parentValue, args){
            return AlertTag .find({peopleId: args.peopleId, detailId: args.detailId})
                            .exec();
        }
    },
    alert_tag_of_type: {
        type: new GraphQLList(AlertTagType),
        args: {
            alertType: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parentValue, args){
            return AlertTag .find({alertType: args.alertType})
                            .exec();
        }
    }
};

//Mutation
module.exports.AlertTagMutation = AlertTagMutation = {
    alert_tag_add: {
        type: AlertTagType,
        args: {
            peopleId: {type: new GraphQLNonNull(GraphQLString)},
            detailId: {type: new GraphQLNonNull(GraphQLString)},
            alertType: {type: new GraphQLNonNull(GraphQLString)},
            msg: {type: GraphQLString},
        },
        resolve(parentValue, args){
            return AlertTag.AddAlertTagToDetail(args.peopleId, args.detailId, args.alertType, args.msg);
        }
    },
    alert_tag_remove_by_id: {
        type: AlertTagType,
        args: {
            _id: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parentValue, args){
            return AlertTag .findOne({_id: args._id})
                            .remove()
                            .exec();
        }
    }
};