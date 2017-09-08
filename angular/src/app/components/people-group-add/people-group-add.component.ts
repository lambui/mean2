import { GraphqlService } from '../../services/graphql/graphql.service';
import { PeopleGroupService } from '../../services/people-group/people-group.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-people-group-add',
  templateUrl: './people-group-add.component.html',
  styleUrls: ['./people-group-add.component.css']
})
export class PeopleGroupAddComponent implements OnInit {

  constructor(
    private peopleGroupService: PeopleGroupService,
    private graphqlService: GraphqlService
  ) { }

  @Input() people: any;
  groups: any[];
  ngOnInit() {
  }

  AddPeople(peopleId: string)
  {
  }

  Test()
  {
    this.graphqlService .NewGraphQLRequest('people')
                        .AppendField("firstName")
                        .AppendField("lastName")
                        .AppendRequestInfo('DOB {year, month, date}')
                        .IsList(true)
                        .Build()
                        .Run()
                        .subscribe(res => console.log(res));
  }
} 
