var exports = module.exports = {};

exports.rootQueryJson = {
    name: 'RootQueryType',
    fields: {}
};

exports.mutationJson = {
    name: 'mutation',
    fields: {}
};

AppendQueries = queryJson => {
    for (var key in queryJson) {
        if (queryJson.hasOwnProperty(key)) {
            exports.rootQueryJson.fields[key] = queryJson[key];
        }
    }
};

AppendMutations = appendingJson => {
    for (var key in appendingJson) {
        if (appendingJson.hasOwnProperty(key)) {
            exports.mutationJson.fields[key] = appendingJson[key];
        }
    }
};

exports.AppendQueriesAndMutations = (queryJson, muJson) => {
    if(queryJson) AppendQueries(queryJson);
    if(muJson) AppendMutations(muJson);
}

