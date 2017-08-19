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

const {
    People,
    PeopleCompose,
    PeopleType,
    PeopleDetail,
    PeopleDetailCompose,
    PeopleDetailType
} = require('./type');

const axios = require('axios');

const DetailType = new GraphQLObjectType({
    name: 'PeopleDetailDetail',
    fields: {
        create_at: {type: GraphQLString},
        body: {type: GraphQLString},
        _id: {type: GraphQLString}
    }
})

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
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
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
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
    }
});

module.exports = new GraphQLSchema({
   query: rootQuery,
   mutation: mutation
});