import { AlertTagService } from '../../services/alert-tag/alert-tag.service';
import { PeopleSuperService } from '../../services/people-super/people-super.service';
import { AppMaterializeService } from '../../services/app-materialize/app-materialize.service';
import { PeopleService } from '../../services/people/people.service';
import { PeopleDetailService } from '../../services/people-detail/people-detail.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.css']
})
export class PeopleDetailComponent implements OnInit {

  constructor(
    private peopleDetailService: PeopleDetailService,
    private peopleService: PeopleService,
    private alertTagService: AlertTagService,
    private router: Router, 
    private route: ActivatedRoute,
    private appMaterializeService: AppMaterializeService,
    private peopleSuperService: PeopleSuperService
  ) { }

  people: any;
  DOB: any;
  detailList: any;
  alertTags: any;
  ngOnInit() {
    this.peopleSuperService.GetInfoFromPeopleId(this.route, this);
  }

  PeopleSuperService_GetInfoFromPeopleIdRespondHandler(respond)
  {
    this.people = this.peopleSuperService.people;
    this.DOB = this.Get8DigitDOBString();
    this.GetDetailList();
    this.GetAlertTags();
  }

  GetDetailList()
  {
    this.peopleDetailService.GetDetailList(this.people._id)
                            .subscribe(detailList => this.detailList = detailList);
  }

  GetAlertTags()
  {
    this.alertTagService.GetAlertTagsBelongToPerson(this.people._id)
                        .subscribe(tags => this.alertTags = tags);
  }

  Get8DigitDOBString()
  {
    if(this.people == null)
      return;
    
    let returnVal = "";
    returnVal += this.people.DOB.year + "-";
    if(this.people.DOB.month.length < 2)
      returnVal += "0";
    returnVal += this.people.DOB.month + "-";
    if(this.people.DOB.date.length < 2)
      returnVal += "0";
    returnVal += this.people.DOB.date;
    return returnVal;
  }

  detailInput: string = "";
  AddDetail()
  {
    this.peopleDetailService.AddDetail(this.people._id, this.detailInput)
                            .subscribe(detailList => {
                              this.detailList = detailList;
                              this.detailInput = "";
                              this.appMaterializeService.TextareaChangeValue('#detailBody', this.detailInput, "#detailBody-label");
                            });
  }

  RemoveDetail(detailId: string)
  {
    this.peopleDetailService.RemoveDetail(this.people._id, detailId)
                            .subscribe(() => {
                              this.GetDetailList(); 
                            });
  }

  ViewDetail(detailId: string)
  {
    this.router.navigate(['./' + detailId], {relativeTo: this.route});
  }

  RouteBack()
  {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }
}
