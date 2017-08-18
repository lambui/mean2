import { PeopleDetailService } from '../../services/people-detail/people-detail.service';
import { PeopleDetailComponent } from '../people-detail/people-detail.component';
import { PeopleService } from '../../services/people/people.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  all: any;
  constructor(
    private peopleService: PeopleService,
    private peopleDetailService: PeopleDetailService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.GetAllPeople();
  }

  ConvertDateToString(date: Date)
  {
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
  }

  GetAllPeople()
  {
    this.peopleService.GetAllPeople()
                      .subscribe((list: any) => {this.all = list;},
                                  err => {console.log("error: " + err)});
  }

  DeletePeopleRespondHandler(res)
  {
    if(res.success == true)
      this.GetAllPeople();
    else
      console.log(res.msg);
  }

  RouteToAdd()
  {
    this.router.navigate(['./add'], {relativeTo: this.route});
  }
}
