import { GraphqlService } from '../../services/graphql/graphql.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PeopleGroupAddService 
{
    constructor(
        private graphqlService: GraphqlService
    ) { }

    GetPeopleGroups()
    {
        return this.graphqlService  .NewGraphQLRequest("people_group_all")
                                    .AppendField("name")
                                    .IsList(true)
                                    .Build()
                                    .Run();
    }

    AddPeopleToGroup(groupName: string, peopleId: string, msg: string)
    {
        return this.graphqlService  .NewGraphQLRequest('people_group_add')
                                    .AppendArg({name: "name", value: groupName})
                                    .AppendArg({name: "peopleId", value: peopleId})
                                    .AppendArg({name: "msg", value: msg})
                                    .AppendField("name")
                                    .AppendRequestInfo("list{peopleId, msg, _id}")
                                    .IsMutation(true)
                                    .Build()
                                    .Run();
    }
}