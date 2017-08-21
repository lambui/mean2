import { AlertTagService } from '../../services/alert-tag/alert-tag.service';
import { PeopleSuperService } from '../../services/people-super/people-super.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-people-detail-view',
  templateUrl: './people-detail-view.component.html',
  styleUrls: ['./people-detail-view.component.css']
})
export class PeopleDetailViewComponent implements OnInit {

  constructor(
    private alertTagService: AlertTagService, 
    private peopleSuperService: PeopleSuperService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  people: any;
  detail: any;
  ngOnInit() {
    this.peopleSuperService.GetInfoFromPeopleIdAndDetailId(this.route, this);
  }

  PeopleSuperService_GetInfoFromPeopleIdAndDetailId(res)
  {
    this.people = res[0];
    if(res[1].details.length <= 0)
      this.router.navigate(['./404']);
    else
      this.detail = res[1].details[0];
  }

  RouteBack()
  {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
