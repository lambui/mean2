import { AlertTagService } from '../../services/alert-tag/alert-tag.service';
import { PeopleSuperService } from '../../services/people-super/people-super.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-people-detail-view',
  templateUrl: './people-detail-view.component.html',
  styleUrls: ['./people-detail-view.component.css']
})
export class PeopleDetailViewComponent implements OnInit, DoCheck {

  constructor(
    private alertTagService: AlertTagService, 
    private peopleSuperService: PeopleSuperService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  people: any;
  detail: any;
  alertTags: any;
  ngOnInit() {
    this.peopleSuperService.GetInfoFromPeopleId(this.route, this);
    this.peopleSuperService.GetInfoFromDetailId(this.route, this);
  }

  ngDoCheck()
  {
    if(this.people && this.detail)
      if(!this.alertTags)
        this.alertTagService.GetAlertTagsOfDetail(this.people._id, this.detail._id)
                            .subscribe(tags => this.alertTags = tags);
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
