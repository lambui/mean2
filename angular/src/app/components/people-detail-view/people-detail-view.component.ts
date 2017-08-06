import { PeopleSuperService } from '../../services/people-super/people-super.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-people-detail-view',
  templateUrl: './people-detail-view.component.html',
  styleUrls: ['./people-detail-view.component.css']
})
export class PeopleDetailViewComponent implements OnInit {

  constructor(
    private peopleSuperService: PeopleSuperService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  people: any;
  detail: any;
  ngOnInit() {
    this.peopleSuperService.GetInfoFromPeopleId(this.route, this);
    this.peopleSuperService.GetInfoFromDetailId(this.route, this);
  }

  PeopleSuperService_GetInfoFromPeopleIdRespondHandler(respond)
  {
    this.people = respond;
  }

  PeopleSuperService_GetInfoFromDetailIdRespondHandler(respond)
  {
    if(respond.details.length <= 0)
      this.router.navigate(['./404']);
    else
      this.detail = respond.details[0];
  }

  RouteBack()
  {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
