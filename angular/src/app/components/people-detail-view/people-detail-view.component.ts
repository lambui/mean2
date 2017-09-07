import { PeopleDetailService } from '../../services/people-detail/people-detail.service';
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
    private peopleDetailService: PeopleDetailService,
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
    this.CheckNeighborDetails();
  }

  RouteBack()
  {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  NextDetail()
  {
    if(this.nextId)
    {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.navigate(['../' + this.nextId], {relativeTo: this.route});
    }
  }

  PreviousDetail()
  {
    if(this.previousId)
    {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.navigate(['../' + this.previousId], {relativeTo: this.route});
    }
  }

  SearchForNeighbor(array: any[], lower: number, upper: number, index: number) //step = how far away from target
  { 
    while(upper > lower)
    {
      let range = upper - lower + 1;
      let midpoint = lower + Math.floor(range/2);

      let elementIndex = array[midpoint].index;

      if(elementIndex == index)
      {
        if(midpoint < array.length && midpoint >= 0)
          return midpoint
        else
          return;
      }
      else
      {
        
        if(elementIndex > index)
        {
          upper = midpoint-1;
        }
        else
        {
          lower = midpoint+1;
        }
      }
    }

    if(upper == lower)
    {
      if(array[lower].index == index)
      {
        if(lower< array.length && lower>= 0)
          return lower;
        else
          return;
      }
    }
    else
      return;
  }

  nextId: string = "";
  previousId: string = "";
  CheckNeighborDetails()
  {
    this.peopleDetailService.GetDetailList(this.people._id)
                            .subscribe(res => {
                              this.nextId = "";
                              this.previousId = "";
                              let index = this.SearchForNeighbor(res.details, 0, res.details.length-1, this.detail.index);

                              if(res.details[index+1])
                              {
                                this.nextId = res.details[index+1]._id;
                              }
                              if(res.details[index-1])
                              {
                                this.previousId = res.details[index-1]._id;
                              }
                            });
  }

  GetDate(fulldate: string)
  {
    return fulldate.substr(0, 10);
  }
}
