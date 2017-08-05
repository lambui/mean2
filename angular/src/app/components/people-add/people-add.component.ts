import { PeopleService } from '../../services/people/people.service';
import { AppMaterializeService } from '../../services/app-materialize/app-materialize.service';
import { Component, OnInit } from '@angular/core';
import { PeopleAddFormService } from './people-add.form.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-people-add',
  templateUrl: './people-add.component.html',
  styleUrls: ['./people-add.component.css'],
  providers: [PeopleAddFormService]
})
export class PeopleAddComponent implements OnInit {

  constructor(
    private compFormService: PeopleAddFormService,
    private appMaterializeService: AppMaterializeService,
    private peopleService: PeopleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  newPeople: any = [];
  ngOnInit() 
  {
    this.compFormService.InitForm();

    this.appMaterializeService.InitDatePicker();
    $('#DOB') .pickadate('picker')
              .on({
                set: (setValue) => {
                  let date = new Date(setValue.select);
                  this.compFormService.SetValueOfField('DOB', this.ConvertDateToString(date));
                }
              });
    let date = new Date();
    this.compFormService.SetValueOfField('DOB', this.ConvertDateToString(date));
  }

  ConvertDateToString(date: Date) 
  {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
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
                      .subscribe(addedPerson => {this.newPeople.push(addedPerson); this.compFormService.ClearForm();},
                                  err => console.log("error: " + err));
  }

  DeletePeopleRespondHandler(res)
  {
    if(res.success)
      this.newPeople.splice(res.index, 1);
    else
      console.log(res.msg);
  }

  RouteBack()
  {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
