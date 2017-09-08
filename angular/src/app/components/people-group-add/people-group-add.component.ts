import { Component, OnInit, Input } from '@angular/core';
import { PeopleGroupAddService } from './people-group-add.service';
import { PeopleGroupAddFormService } from './people-group-add.form.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-people-group-add',
  templateUrl: './people-group-add.component.html',
  styleUrls: ['./people-group-add.component.css'],
  providers: [PeopleGroupAddService, PeopleGroupAddFormService]
})
export class PeopleGroupAddComponent implements OnInit {

  constructor(
    private compService: PeopleGroupAddService,
    private compFormService: PeopleGroupAddFormService
  ) { }

  @Input() people: any;
  groups: any[];
  form: FormGroup;
  ngOnInit() {
    this.compFormService.InitForm();
    this.compService.GetPeopleGroups()
                    .subscribe(res => this.groups = res);
  }

  AddPeople()
  {
    if(this.people == null)
      return;
    let groupName = this.compFormService.GetValueOfField('group');
    let msg = this.compFormService.GetValueOfField('msg');
    this.compService.AddPeopleToGroup(groupName, this.people._id, msg)
                    .subscribe(res => console.log(res));
  }
} 
