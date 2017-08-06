import { PeopleDetailService } from '../people-detail/people-detail.service';
import { PeopleService } from '../people/people.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class PeopleSuperService {

  constructor(
    private peopleService: PeopleService,
    private peopleDetailService: PeopleDetailService
  ) { }

  people: any;
  GetInfoFromPeopleId(route: ActivatedRoute, component: any)
  {
    route.params.subscribe(params => {
      let id = params['peopleId'];
      this.peopleService.GetPeople(id)
                        .subscribe((people: any) => {
                          if(people.error == true)
                            console.log(people.msg);
                          else
                          {
                            this.people = people;
                            if(component.PeopleSuperService_GetInfoFromPeopleIdRespondHandler)
                              component.PeopleSuperService_GetInfoFromPeopleIdRespondHandler(people);
                          }
                        });
    });
  }

  detail: any;
  GetInfoFromDetailId(route: ActivatedRoute, component: any)
  {
    route.params.subscribe(params => {
      let id = params['peopleId'];
      let detailId = params['detailId'];
      this.peopleDetailService.GetDetail(id, detailId)
                              .subscribe((detailPackage: any) => {
                                if(detailPackage.error == true)
                                  console.log(detailPackage.msg);
                                else
                                {
                                  this.detail = detailPackage.details[0];
                                  if(component.PeopleSuperService_GetInfoFromDetailIdRespondHandler)
                                    component.PeopleSuperService_GetInfoFromDetailIdRespondHandler(detailPackage);
                                }
                              });
    });
  }
}
