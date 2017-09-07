const mongoose = require('mongoose');
const databaseConfig = require('../../config/database');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLBoolean
} = require('graphql');
const graphqlComposeMongoose = require('graphql-compose-mongoose');

const peopleGroupSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true, uppercase: true, trim: true},
    desc: {type: String},
    list: [{
        peopleId: mongoose.Schema.Types.ObjectId,
        add_date: Date,
        msg: String
    }]
});

const group = module.exports.PeopleGroup = mongoose.model('PeopleGroup', peopleGroupSchema, 'PeopleGroup');
const { People } = require('./people-model-graphql');

module.exports.PeopleGroupCompose = PeopleGroupCompose = graphqlComposeMongoose.composeWithMongoose(group, {});
module.exports.PeopleGroupType = PeopleGroupType = PeopleGroupCompose.getType();

//Query
module.exports.PeopleGroupQuery = PeopleGroupQuery = {
    people_group_all: {
        type: new GraphQLList(PeopleGroupType),
        resolve(parentValue, args) {
            return group.find({})
                        .exec();
        }
    }
};

//Mutation
module.exports.PeopleGroupMutation = PeopleGroupMutation = {
    people_group_create: {
        type: PeopleGroupType,
        args: {
            name: {type: new GraphQLNonNull(GraphQLString)},
            desc: {type: GraphQLString}
        },
        resolve(parentValue, args)
        {
            let newGroup = new group({
                name: args.name,
                desc: args.desc,
                list: []
            });
            return newGroup.save();
        }
    },
    people_group_add: {
        type: PeopleGroupType,
        args: {
            name: {type: new GraphQLNonNull(GraphQLString)},
            peopleId: {type: new GraphQLNonNull(GraphQLString)},
            msg: {type: GraphQLString}
        },
        resolve(parentValue, args)
        {
            let groupObs = group    .findOne({name: args.name})
                                    .exec();
            
            let peopleObs = People  .findOne({_id: args.peopleId})
                                    .exec();

            return Promise  .all([groupObs, peopleObs])
                            .then(res => {
                                if(res[0] == null || res[1] == null)
                                    return Promise.resolve(null);
                                let newEntry = {
                                    peopleId: res[1]._id,
                                    add_date: new Date(),
                                    msg: args.msg
                                };
                                res[0].list.push(newEntry);
                                return res[0].save();
                            });
        }
    },
    people_group_remove: {
        type: PeopleGroupType,
        args: {
            name: {type: new GraphQLNonNull(GraphQLString)},
            elementId: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parentValue, args) {
            return group.update(
                            {name: args.name}, 
                            {$pull: {list: {_id: args.elementId}}}
                        )
                        .exec();
        }
    },
    people_group_purge: {
        type: PeopleGroupType,
        args: {
            name: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parentValue, args) {
            return group.findOne({name: args.name})
                        .exec()
                        .then(res => {
                            res.list = [];
                            return res.save();
                        });
        }
    },
    people_group_delete: {
        type: new GraphQLList(PeopleGroupType),
        args: {
            name: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parentValue, args) {
            return group.remove({name: args.name.trim().toUpperCase()})
                        .exec()
                        .then(res => group.find({}).exec());
        }
    }
};
