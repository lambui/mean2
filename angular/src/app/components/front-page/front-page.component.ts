import { AppMaterializeService } from '../../services/app-materialize/app-materialize.service';
import { PeopleService } from '../../services/people/people.service';
import { Component, OnInit } from '@angular/core';
import { FrontPageFormService } from './front-page.form.service';
declare var $: any;

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css'],
  providers: [FrontPageFormService]
})
export class FrontPageComponent implements OnInit {

  all: any;
  constructor(
    private appMaterializeService: AppMaterializeService,
    private peopleService: PeopleService,
    private compFormService: FrontPageFormService
  ) { }

  ngOnInit() {
    this.compFormService.InitForm();

    this.appMaterializeService.InitDatePicker();
    $('#DOB').pickadate('picker').on({
      set: (setValue) => {
        let date = new Date(setValue.select);
        this.compFormService.SetValueOfField('DOB', this.ConvertDateToString(date));
      }
    });

    this.GetAllPeople();
  }

  ngAfterViewInit()
  {
    let date = new Date();
    this.compFormService.SetValueOfField('DOB', this.ConvertDateToString(date));
  }

  ConvertDateToString(date: Date)
  {
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
  }

  GetAllPeople()
  {
    this.peopleService.GetAllPeople()
                      .subscribe(list => {this.all = list},
                                  err => {console.log("error: " + err)});
  }

  AddPeople()
  {
    let date = (<string>this.compFormService.GetValueOfField('DOB')).split('-');
    let person = {
      firstName: this.compFormService.GetValueOfField('firstName'),
      lastName: this.compFormService.GetValueOfField('lastName'),
      DOB: {
        year: date[0],
        month: date[1],
        date: date[2]
      }
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
