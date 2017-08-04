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
    private route: ActivatedRoute
  ) { }

  people: any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['peopleId'];
      this.peopleService.GetPeople(id)
                        .subscribe((people: any) => {
                          if(people.error == true)
                            console.log(people.msg);
                          else
                            this.people = people;
                        });
    });
  }
}
