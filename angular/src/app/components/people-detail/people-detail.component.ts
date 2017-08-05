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
    private router: Router, 
    private route: ActivatedRoute,
    private appMaterializeService: AppMaterializeService
  ) { }

  people: any;
  DOB: any;
  detailList: any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['peopleId'];
      this.peopleService.GetPeople(id)
                        .subscribe((people: any) => {
                          if(people.error == true)
                            console.log(people.msg);
                          else
                          {
                            this.people = people;
                            this.DOB = this.Get8DigitDOBString();
                            this.GetDetailList();
                          }
                        });
    });
  }

  GetDetailList()
  {
    this.peopleDetailService.GetDetailList(this.people._id)
                            .subscribe(detailList => this.detailList = detailList);
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
}
