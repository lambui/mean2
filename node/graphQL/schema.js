const {
    GraphQLObjectType,
    GraphQLSchema
} = require('graphql');

const GraphQLInit = require('./graphql-init');

//people-model middleware
const {
    PeopleQuery,
    PeopleMutation
} = require('./models/people-model-graphql');
GraphQLInit.AppendQueriesAndMutations(PeopleQuery, PeopleMutation);

//people-detail-model middleware
const {
    PeopleDetailQuery,
    PeopleDetailMutation
} = require('./models/people-detail-model-graphql');
GraphQLInit.AppendQueriesAndMutations(PeopleDetailQuery, PeopleDetailMutation);

//alert-tag-model middleware
const {
    AlertTagQuery,
    AlertTagMutation
} = require('./models/alert-tag-model-graphql');
GraphQLInit.AppendQueriesAndMutations(AlertTagQuery, AlertTagMutation);

const rootQuery = new GraphQLObjectType(GraphQLInit.rootQueryJson);
const mutation = new GraphQLObjectType(GraphQLInit.mutationJson);
module.exports = new GraphQLSchema({
   query: rootQuery,
   mutation: mutation
});