import { PeopleService } from '../../services/people/people.service';
import { Component, OnInit } from '@angular/core';
import { FrontPageFormService } from './front-page.form.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css'],
  providers: [FrontPageFormService]
})
export class FrontPageComponent implements OnInit {

  all: any;
  constructor(
    private peopleService: PeopleService,
    private compFormService: FrontPageFormService
  ) { }

  ngOnInit() {
    this.compFormService.InitForm();
    this.GetAllPeople();
  }

  GetAllPeople()
  {
    this.peopleService.GetAllPeople()
                      .subscribe(list => {this.all = list},
                                  err => {console.log("error: " + err)});
  }

  AddPeople()
  {
    let person = {
      firstName: this.compFormService.GetValueOfField('firstName'),
      lastName: this.compFormService.GetValueOfField('lastName'),
      DOB: this.compFormService.GetValueOfField('DOB')
    }

    this.peopleService.AddPeople(person)
                      .subscribe(addedPerson => {this.GetAllPeople(); this.compFormService.ClearForm();},
                                  err => console.log("error: " + err));
  }

  DeletePeople(id: any)
  {
    this.peopleService.DeletePeople(id)
                      .subscribe(() => this.GetAllPeople(),
                                  err => console.log("error: " + err));
  }
}
