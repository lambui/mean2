import { PeopleDetailService } from '../people-detail/people-detail.service';
import { PeopleService } from '../people/people.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class PeopleSuperService {

  constructor(
    private peopleService: PeopleService,
    private peopleDetailService: PeopleDetailService,
    private router: Router
  ) { }

  people: any;
  GetInfoFromPeopleId(route: ActivatedRoute, component: any)
  {
    route.params.subscribe(params => {
      let id = params['peopleId'];
      this.peopleService.GetPeople(id)
                        .subscribe((people: any) => {
                          if(people.error == true)
                          {
                            console.log(people.msg);
                            if(component.PeopleSuperService_GetInfoFromPeopleErrorHandler)
                              component.PeopleSuperService_GetInfoFromPeopleErrorHandler(people);
                            else //route to 404
                              this.router.navigate(['./404']);
                          }
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
                                {
                                  console.log(detailPackage.msg);
                                  if(component.PeopleSuperService_GetInfoFromDetailErrorHandler)
                                    component.PeopleSuperService_GetInfoFromDetailErrorHandler(detailPackage);
                                  else //route to 404
                                    this.router.navigate(['./404']);
                                }
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
