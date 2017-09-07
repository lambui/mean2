import { PeopleGroupService } from '../../services/people-group/people-group.service';
import { Component, OnInit } from '@angular/core';
import { ControlCreateGroupFormService } from './control-create-group.form.service';

@Component({
  selector: 'app-control-create-group',
  templateUrl: './control-create-group.component.html',
  styleUrls: ['./control-create-group.component.css'],
  providers: [ControlCreateGroupFormService]
})
export class ControlCreateGroupComponent implements OnInit {

  constructor(
    private peopleGroupService: PeopleGroupService,
    private compFormService: ControlCreateGroupFormService
  ) { }

  groups: any[];
  ngOnInit() {
    this.compFormService.InitForm();
    this.peopleGroupService .GetAllGroups()
                            .subscribe(res => this.groups = res);
  }

  SubmitForm()
  {
    let name = this.compFormService.GetValueOfField('name');
    let desc = this.compFormService.GetValueOfField('desc');
    this.peopleGroupService .CreateGroup(name, desc)
                            .subscribe(res => {
                              if(res)
                              {
                                this.groups.push(res);
                                this.compFormService.ClearForm();
                              }
                            });
  }
}
